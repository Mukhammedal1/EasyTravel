import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAdminDto: CreateAdminDto) {
    const { password, email, ...data } = createAdminDto;
    const admin = await this.prismaService.admin.findFirst({
      where: { email },
    });
    if (admin) {
      throw new BadRequestException("Bunday admin mavjud");
    }
    const hashed_password = await bcrypt.hash(password, 7);

    const newAdmin = await this.prismaService.admin.create({
      data: { ...data, hashed_password, email },
    });

    return { message: "Added successfuly", newAdmin };
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string | null) {
    const updatedAdmin = await this.prismaService.admin.update({
      where: { id },
      data: { hashed_token: hashed_refresh_token },
    });
    return updatedAdmin;
  }

  findAll() {
    return this.prismaService.admin.findMany();
  }

  async findOne(id: number) {
    const admin = await this.prismaService.admin.findUnique({ where: { id } });
    if (!admin) {
      throw new BadRequestException("Admin not found");
    }
    return admin;
  }

  findOneByEmail(email: string) {
    return this.prismaService.admin.findUnique({ where: { email } });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const { password, ...data } = updateAdminDto;
    const updated_hashed_password = await bcrypt.hash(password!, 7);

    const updatedAdmin = await this.prismaService.admin.update({
      where: { id },
      data: { ...data, hashed_password: updated_hashed_password },
    });

    return { message: "Updated successfuly", updatedAdmin };
  }

  async remove(id: number) {
    const deletedAdmin = await this.prismaService.admin.delete({
      where: { id },
    });

    return { message: "Deleted successfuly", deletedAdmin };
  }
}
