import { Injectable } from "@nestjs/common";
import { CreateDiscountDto } from "./dto/create-discount.dto";
import { UpdateDiscountDto } from "./dto/update-discount.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class DiscountsService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createDiscountDto: CreateDiscountDto) {
    const { valid_from, valid_to, ...data } = createDiscountDto;
    const formatvalid_from = new Date(valid_from);
    const formatvalid_to = new Date(valid_to);
    return this.prismaService.discounts.create({
      data: { ...data, valid_from: formatvalid_from, valid_to: formatvalid_to },
    });
  }

  findAll() {
    return this.prismaService.discounts.findMany({
      include: { tour_package: true },
    });
  }

  findOne(id: number) {
    return this.prismaService.discounts.findUnique({ where: { id } });
  }

  findDiscountByDate(id: number) {
    return this.prismaService.discounts.findFirst({
      where: {
        id,
        valid_to: {
          gt: new Date(),
        },
      },
    });
  }

  update(id: number, updateDiscountDto: UpdateDiscountDto) {
    const { valid_from, valid_to, ...data } = updateDiscountDto;
    const formatvalid_from = new Date(valid_from!);
    const formatvalid_to = new Date(valid_to!);
    return this.prismaService.discounts.update({
      where: { id },
      data: { valid_from: formatvalid_from, valid_to: formatvalid_to, ...data },
    });
  }

  remove(id: number) {
    return this.prismaService.discounts.delete({ where: { id } });
  }
}
