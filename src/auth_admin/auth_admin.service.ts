import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AdminService } from "../admin/admin.service";
import { Admin } from "@prisma/client";
import { AdminSignInDto, CreateAdminDto } from "../admin/dto";
import { Response } from "express";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthAdminService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService
  ) {}

  async getTokens(admin: Admin) {
    const payload = {
      id: admin.id,
      is_creator: admin.is_creator,
      email: admin.email,
      isAdmin: true,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ADMIN_ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.ADMIN_REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  // async signUp(createAdminDto: CreateAdminDto) {
  //   const admin = await this.adminService.findOneByEmail(createAdminDto.email);
  //   if (admin) {
  //     throw new BadRequestException("Bunday admin mavjud");
  //   }
  //   const newAdmin = await this.adminService.create(createAdminDto);
  //   const response = {
  //     message: "Admin tizimga qo'shildi",
  //     newAdmin,
  //   };
  //   return response;
  // }

  async signIn(signInDto: AdminSignInDto, res: Response) {
    const admin = await this.adminService.findOneByEmail(signInDto.email);
    if (!admin) {
      throw new UnauthorizedException("Eamil yoki parol noto'g'ri");
    }
    const isvalidPassword = await bcrypt.compare(
      signInDto.password,
      admin.hashed_password
    );

    if (!isvalidPassword) {
      throw new UnauthorizedException("Eamil yoki parol noto'g'ri");
    }
    const tokens = await this.getTokens(admin);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatedAdmin = await this.adminService.updateRefreshToken(
      admin.id,
      hashed_refresh_token
    );
    if (!updatedAdmin) {
      throw new InternalServerErrorException("Tokenni saqlashda xatolik");
    }
    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    const response = {
      message: "Login is successfully",
      adminId: admin.id,
      access_token: tokens.access_token,
    };
    return response;
  }

  async signOut(refreshToken: string, res: Response) {
     if (!refreshToken) {
       throw new NotFoundException("Refresh token not found");
     }
    const adminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.ADMIN_REFRESH_TOKEN_KEY,
    });
    if (!adminData) {
      throw new ForbiddenException("Admin not verified");
    }
    const hashed_refresh_token = null;
    await this.adminService.updateRefreshToken(
      adminData.id,
      hashed_refresh_token
    );
    res.clearCookie("refresh_token");
    const response = {
      message: "Logout is successfully",
    };
    return response;
  }

  async refreshToken(adminId: number, refreshToken: string, res: Response) {
     if (!refreshToken) {
       throw new NotFoundException("Refresh token not found");
     }
    const decodedToken = await this.jwtService.decode(refreshToken);
    if (adminId !== decodedToken["id"]) {
      throw new BadRequestException("Ruxsat etilmagan foydalanuvchi");
    }
    const admin = await this.adminService.findOne(adminId);
    if (!admin || !admin.hashed_token) {
      throw new BadRequestException("Admin not found");
    }
    const tokenMatch = await bcrypt.compare(refreshToken, admin.hashed_token);
    if (!tokenMatch) {
      throw new ForbiddenException("Tokens not matched");
    }
    const tokens = await this.getTokens(admin);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    await this.adminService.updateRefreshToken(admin.id, hashed_refresh_token);

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: Number(process.env.COOKIE_TIME), // 15 * 24 * 60 * 60 * 1000
      httpOnly: true,
    });
    const response = {
      message: "access token refreshed",
      admin: admin.id,
      access_token: tokens.access_token,
    };
    return response;
  }
}
