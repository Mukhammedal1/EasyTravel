import { Module } from "@nestjs/common";
import { TravelerVisaInfoService } from "./traveler_visa_info.service";
import { TravelerVisaInfoController } from "./traveler_visa_info.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { TravelersModule } from "../travelers/travelers.module";
import { OrdersModule } from "../orders/orders.module";
import { TourPackageModule } from "../tour_package/tour_package.module";
import { AviaTicketsModule } from "../avia_tickets/avia_tickets.module";
import { TravelersOrderModule } from "../travelers_order/travelers_order.module";
import { ContractsModule } from "../contracts/contracts.module";

@Module({
  imports: [
    PrismaModule,
    TravelersModule,
    OrdersModule,
    TourPackageModule,
    AviaTicketsModule,
    TravelersOrderModule,
    ContractsModule
  ],
  controllers: [TravelerVisaInfoController],
  providers: [TravelerVisaInfoService],
})
export class TravelerVisaInfoModule {}
