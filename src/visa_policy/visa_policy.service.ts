import { Injectable } from "@nestjs/common";
import { CreateVisaPolicyDto } from "./dto/create-visa_policy.dto";
import { UpdateVisaPolicyDto } from "./dto/update-visa_policy.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Certificate } from "crypto";

@Injectable()
export class VisaPolicyService {
  constructor(private readonly prismaService: PrismaService) {}
  
  create(createVisaPolicyDto: CreateVisaPolicyDto) {
    return this.prismaService.visaPolicy.create({ data: createVisaPolicyDto });
  }

  findAll() {
    return this.prismaService.visaPolicy.findMany();
  }

  findOne(id: number) {
    return this.prismaService.visaPolicy.findUnique({ where: { id } });
  }

  update(id: number, updateVisaPolicyDto: UpdateVisaPolicyDto) {
    return this.prismaService.visaPolicy.update({
      where: { id },
      data: updateVisaPolicyDto,
    });
  }

  remove(id: number) {
    return this.prismaService.visaPolicy.delete({ where: { id } });
  }
}
