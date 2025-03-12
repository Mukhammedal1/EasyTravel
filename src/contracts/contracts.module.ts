import { forwardRef, Module } from "@nestjs/common";
import { ContractsService } from "./contracts.service";
import { ContractsController } from "./contracts.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { OrdersModule } from "../orders/orders.module";
import { TourPackageModule } from "../tour_package/tour_package.module";
import { TravelersModule } from "../travelers/travelers.module";
import { CustomersModule } from "../customers/customers.module";
import { AviaTicketsModule } from "../avia_tickets/avia_tickets.module";
import { HotelsModule } from "../hotels/hotels.module";
import { InsuranceModule } from "../insurance/insurance.module";
import { AdminService } from "../admin/admin.service";
import { AdminModule } from "../admin/admin.module";

@Module({
  imports: [
    PrismaModule,
    OrdersModule,
    TourPackageModule,
    CustomersModule,
    AviaTicketsModule,
    HotelsModule,
    InsuranceModule,
    AdminModule,
  ],
  controllers: [ContractsController],
  providers: [ContractsService],
  exports: [ContractsService],
})
export class ContractsModule {}
