import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { PrismaService } from "../prisma/prisma.service";
import { TourPackageService } from "../tour_package/tour_package.service";
import { InsuranceService } from "../insurance/insurance.service";

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    return this.prismaService.orders.create({ data: createOrderDto });
  }

  findAll() {
    return this.prismaService.orders.findMany({
      include: { Customers: true, TourPackage: true },
    });
  }

  findOne(id: number) {
    const id2 = Number(id);
    return this.prismaService.orders.findUnique({ where: { id: id2 } });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.prismaService.orders.update({
      where: { id },
      data: updateOrderDto,
    });
  }

  remove(id: number) {
    return this.prismaService.orders.delete({ where: { id } });
  }
}
