import { Injectable } from "@nestjs/common";
import { CreateTravelersOrderDto } from "./dto/create-travelers_order.dto";
import { UpdateTravelersOrderDto } from "./dto/update-travelers_order.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class TravelersOrderService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createTravelersOrderDto: CreateTravelersOrderDto) {
    return this.prismaService.travelersOrder.create({
      data: createTravelersOrderDto,
    });
  }

  findAll() {
    return this.prismaService.travelersOrder.findMany({
      include: { Travelers: true },
    });
  }

  findOne(id: number) {
    return this.prismaService.travelersOrder.findUnique({ where: { id } });
  }

  findOneByTO(travelerId: number, orderId: number) {
    return this.prismaService.travelersOrder.findFirst({
      where: { travelersId: travelerId, ordersId: orderId },
    });
  }

  update(id: number, updateTravelersOrderDto: UpdateTravelersOrderDto) {
    return this.prismaService.travelersOrder.update({
      where: { id },
      data: updateTravelersOrderDto,
    });
  }

  remove(id: number) {
    return this.prismaService.travelersOrder.delete({ where: { id } });
  }
}
