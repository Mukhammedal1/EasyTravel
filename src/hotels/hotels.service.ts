import { Injectable } from "@nestjs/common";
import { CreateHotelDto } from "./dto/create-hotel.dto";
import { UpdateHotelDto } from "./dto/update-hotel.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class HotelsService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createHotelDto: CreateHotelDto) {
    return this.prismaService.hotels.create({ data: createHotelDto });
  }

  findAll() {
    return this.prismaService.hotels.findMany({
      include: { City: true, tour_package: true, images: true },
    });
  }

  findOne(id: number) {
    return this.prismaService.hotels.findUnique({ where: { id } });
  }

  update(id: number, updateHotelDto: UpdateHotelDto) {
    return this.prismaService.hotels.update({
      where: { id },
      data: updateHotelDto,
    });
  }

  remove(id: number) {
    return this.prismaService.hotels.delete({ where: { id } });
  }
}
