import { Module } from "@nestjs/common";
import { TourPackageCityService } from "./tour_package_city.service";
import { TourPackageCityController } from "./tour_package_city.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [TourPackageCityController],
  providers: [TourPackageCityService],
  exports: [TourPackageCityService],
})
export class TourPackageCityModule {}
