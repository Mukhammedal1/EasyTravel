import { Injectable } from "@nestjs/common";
import { CreateTourPackageCityDto } from "./dto/create-tour_package_city.dto";
import { UpdateTourPackageCityDto } from "./dto/update-tour_package_city.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class TourPackageCityService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createTourPackageCityDto: CreateTourPackageCityDto) {
    return this.prismaService.tourPackageCity.create({
      data: createTourPackageCityDto,
    });
  }

  findAll() {
    return this.prismaService.tourPackageCity.findMany({
      include: { TourPackage: true, City: true },
    });
  }

  findOne(id: number) {
    return this.prismaService.tourPackageCity.findUnique({ where: { id } });
  }

  update(id: number, updateTourPackageCityDto: UpdateTourPackageCityDto) {
    return this.prismaService.tourPackageCity.update({
      where: { id },
      data: updateTourPackageCityDto,
    });
  }

  remove(id: number) {
    return this.prismaService.tourPackageCity.delete({ where: { id } });
  }
}
