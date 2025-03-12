import { Injectable } from "@nestjs/common";
import { CreateCityDto } from "./dto/create-city.dto";
import { UpdateCityDto } from "./dto/update-city.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CityService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createCityDto: CreateCityDto) {
    return this.prismaService.city.create({ data: createCityDto });
  }

  findAll() {
    return this.prismaService.city.findMany({
      include: {
        tour_package: true,
        tour_package_city: true,
        hotels: true,
        Country: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.city.findUnique({ where: { id } });
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return this.prismaService.city.update({
      where: { id },
      data: updateCityDto,
    });
  }

  remove(id: number) {
    return this.prismaService.city.delete({ where: { id } });
  }
}
