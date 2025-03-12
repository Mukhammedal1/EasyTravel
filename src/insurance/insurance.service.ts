import { Injectable } from "@nestjs/common";
import { CreateInsuranceDto } from "./dto/create-insurance.dto";
import { UpdateInsuranceDto } from "./dto/update-insurance.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class InsuranceService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createInsuranceDto: CreateInsuranceDto) {
    return this.prismaService.insurance.create({
      data: createInsuranceDto,
    });
  }

  findAll() {
    return this.prismaService.insurance.findMany({
      include: { tour_package: true },
    });
  }

  findOne(id: number) {
    return this.prismaService.insurance.findUnique({ where: { id } });
  }

  update(id: number, updateInsuranceDto: UpdateInsuranceDto) {
    return this.prismaService.insurance.update({
      where: { id },
      data: updateInsuranceDto,
    });
  }

  remove(id: number) {
    return this.prismaService.insurance.delete({ where: { id } });
  }
}
