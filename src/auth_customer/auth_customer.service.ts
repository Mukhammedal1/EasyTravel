import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Customers } from "@prisma/client";
import { CreateCustomerDto, CustomerSignInDto } from "../customers/dto";
import { CustomersService } from "../customers/customers.service";
import { Response } from "express";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthCustomerService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly customerService: CustomersService
  ) {}

  async getTokens(customer: Customers) {
    const payload = {
      id: customer.id,
      is_active: customer.is_active,
      email: customer.email,
      isCustomer: true,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.CUSTOMER_ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.CUSTOMER_REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async signUp(createCustomerDto: CreateCustomerDto) {
    const customer = await this.customerService.findOneByEmail(
      createCustomerDto.email
    );
    if (customer) {
      throw new BadRequestException({ message: "Bunday akkaunt mavjud" });
    }
    const newCustomer = await this.customerService.create(createCustomerDto);
    console.log("customer: ", newCustomer);

    const response = {
      message:
        "Tabriklayman tizimga qo'shildingiz. Akkauntni faollashtirish uchun emailga xat yuborildi",
      newCustomer,
    };
    return response;
  }

  async signIn(signInDto: CustomerSignInDto, res: Response) {
    const customer = await this.customerService.findOneByEmail(signInDto.email);
    if (!customer) {
      throw new UnauthorizedException("Eamil yoki parol noto'g'ri");
    }
    if (!customer.is_active) {
      throw new BadRequestException(
        "Iltimos emailingizga kirib akkauntingizni aktivlashtiring"
      );
    }
    const isvalidPassword = await bcrypt.compare(
      signInDto.password,
      customer.hashed_password
    );

    if (!isvalidPassword) {
      throw new UnauthorizedException("Eamil yoki parol noto'g'ri");
    }
    const tokens = await this.getTokens(customer);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatedCustomer = await this.customerService.updateRefreshToken(
      customer.id,
      hashed_refresh_token
    );
    if (!updatedCustomer) {
      throw new InternalServerErrorException("Tokenni saqlashda xatolik");
    }
    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    const response = {
      message: "SignIn is successfuly",
      customerId: customer.id,
      access_token: tokens.access_token,
    };
    return response;
  }

  async signOut(refreshToken: string, res: Response) {
     if (!refreshToken) {
       throw new NotFoundException("Refresh token not found");
     }
    const customerData = await this.jwtService.verify(refreshToken, {
      secret: process.env.CUSTOMER_REFRESH_TOKEN_KEY,
    });
    if (!customerData) {
      throw new ForbiddenException("Customer not verified");
    }
    const hashed_refresh_token = null;
    await this.customerService.updateRefreshToken(
      customerData.id,
      hashed_refresh_token
    );
    res.clearCookie("refresh_token");
    const response = {
      message: "SignOut is successfully",
    };
    return response;
  }

  async refreshToken(customerId: number, refreshToken: string, res: Response) {
    if (!refreshToken) {
      throw new NotFoundException("Refresh token not found");
    }
    const decodedToken = await this.jwtService.decode(refreshToken);
    if (customerId !== decodedToken["id"]) {
      throw new BadRequestException("Ruxsat etilmagan foydalanuvchi");
    }
    const customer = await this.customerService.findOne(customerId);
    if (!customer || !customer.hashed_token) {
      throw new BadRequestException("customer not found");
    }
    const tokenMatch = await bcrypt.compare(
      refreshToken,
      customer.hashed_token
    );
    if (!tokenMatch) {
      throw new ForbiddenException("Tokens not matched");
    }
    const tokens = await this.getTokens(customer);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    await this.customerService.updateRefreshToken(
      customer.id,
      hashed_refresh_token
    );

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: Number(process.env.COOKIE_TIME), // 15 * 24 * 60 * 60 * 1000
      httpOnly: true,
    });

    const response = {
      message: "access token refreshed",
      customer: customer.id,
      access_token: tokens.access_token,
    };
    return response;
  }
}
