import { Injectable } from "@nestjs/common";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ReviewsService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createReviewDto: CreateReviewDto) {
    return this.prismaService.reviews.create({ data: createReviewDto });
  }

  findAll() {
    return this.prismaService.reviews.findMany({
      include: { TourPackage: true, Customers: true },
    });
  }

  findOne(id: number) {
    return this.prismaService.reviews.findUnique({ where: { id } });
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return this.prismaService.reviews.update({
      where: { id },
      data: updateReviewDto,
    });
  }

  remove(id: number) {
    return this.prismaService.reviews.delete({ where: { id } });
  }
}
