import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import * as uuid from "uuid";
import { MailService } from "../mail/mail.service";
import { retry } from "rxjs";

@Injectable()
export class CustomersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const { password, email, ...data } = createCustomerDto;
    const hashed_password = await bcrypt.hash(password, 7);
    const activation_link = uuid.v4();
    const customer = await this.prismaService.customers.findUnique({
      where: { email },
    });
    if (customer) {
      throw new BadRequestException("Bunday emailli customer mavjud");
    }
    const customer2 = await this.prismaService.customers.findUnique({
      where: { phone: data.phone },
    });
    if (customer2) {
      throw new BadRequestException("Bunday telefon raqamli customer mavjud");
    }

    const newCustomer = await this.prismaService.customers.create({
      data: { ...data, email, hashed_password, activation_link },
    });

    try {
      await this.mailService.sendMail(newCustomer);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Xat yuborishda xatolik");
    }
    return { message: "Added successfuly", newCustomer };
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }

    const customer = await this.prismaService.customers.findUnique({
      where: {
        activation_link: link,
        is_active: false,
      },
    });

    if (!customer) {
      throw new BadRequestException("Customer already activated");
    }

    const updatedCustomer = await this.prismaService.customers.update({
      where: { activation_link: link },
      data: { is_active: true },
    });

    const response = {
      message: "Customer activated successfully",
      is_active: updatedCustomer.is_active,
    };
    return response;
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string | null) {
    const updatedCustomer = await this.prismaService.customers.update({
      where: { id },
      data: { hashed_token: hashed_refresh_token },
    });
    return updatedCustomer;
  }

  findAll() {
    return this.prismaService.customers.findMany();
  }

  async findOne(id: number) {
    const customer = await this.prismaService.customers.findUnique({
      where: { id },
    });
    if (!customer) {
      throw new BadRequestException("Customer not found");
    }
    return customer;
  }

  findOneByEmail(email: string) {
    return this.prismaService.customers.findUnique({ where: { email } });
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const { password, ...data } = updateCustomerDto;
    const updated_hashed_password = await bcrypt.hash(password!, 7);

    const updatedCustomer = await this.prismaService.customers.update({
      where: { id },
      data: { ...data, hashed_password: updated_hashed_password },
    });

    return { message: "Updated successfuly", updatedCustomer };
  }

  async remove(id: number) {
    const deletedCustomer = await this.prismaService.customers.delete({
      where: { id },
    });

    return { message: "Deleted successfuly", deletedCustomer };
  }
}
