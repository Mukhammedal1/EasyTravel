import { forwardRef, Module } from "@nestjs/common";
import { TravelersService } from "./travelers.service";
import { TravelersController } from "./travelers.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { OrdersModule } from "../orders/orders.module";
import { TourPackageModule } from "../tour_package/tour_package.module";
import { TravelersOrderModule } from "../travelers_order/travelers_order.module";
import { ContractsModule } from "../contracts/contracts.module";

@Module({
  imports: [
    PrismaModule,
    OrdersModule,
    TourPackageModule,
    TravelersOrderModule,
    ContractsModule,
  ],
  controllers: [TravelersController],
  providers: [TravelersService],
  exports: [TravelersService],
})
export class TravelersModule {}
