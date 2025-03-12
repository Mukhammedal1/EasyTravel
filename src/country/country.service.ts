import { Injectable } from "@nestjs/common";
import { CreateCountryDto } from "./dto/create-country.dto";
import { UpdateCountryDto } from "./dto/update-country.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CountryService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createCountryDto: CreateCountryDto) {
    return this.prismaService.country.create({ data: createCountryDto });
  }

  findAll() {
    return this.prismaService.country.findMany({
      include: { city: true, visa_policy: true },
    });
  }

  findOne(id: number) {
    return this.prismaService.country.findUnique({ where: { id } });
  }

  update(id: number, updateCountryDto: UpdateCountryDto) {
    return this.prismaService.country.update({
      where: { id },
      data: updateCountryDto,
    });
  }

  remove(id: number) {
    return this.prismaService.country.delete({ where: { id } });
  }
}
