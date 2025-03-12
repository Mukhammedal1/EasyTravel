import { Module } from "@nestjs/common";
import { TourPackageService } from "./tour_package.service";
import { TourPackageController } from "./tour_package.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { AviaTicketsModule } from "../avia_tickets/avia_tickets.module";
import { HotelsModule } from "../hotels/hotels.module";
import { InsuranceModule } from "../insurance/insurance.module";
import { CityModule } from "../city/city.module";
import { CountryModule } from "../country/country.module";
import { DiscountsModule } from "../discounts/discounts.module";
import { TourPackageCityModule } from "../tour_package_city/tour_package_city.module";
import { FileModule } from "../file/file.module";

@Module({
  imports: [
    PrismaModule,
    AviaTicketsModule,
    HotelsModule,
    InsuranceModule,
    CityModule,
    CountryModule,
    DiscountsModule,
    TourPackageCityModule,
    FileModule
  ],
  controllers: [TourPackageController],
  providers: [TourPackageService],
  exports: [TourPackageService],
})
export class TourPackageModule {}
