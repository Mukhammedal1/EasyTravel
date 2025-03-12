import { Module } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { PaymentsController } from "./payments.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { ContractsModule } from "../contracts/contracts.module";
import { OrdersModule } from "../orders/orders.module";
import { TourPackageModule } from "../tour_package/tour_package.module";

@Module({
  imports: [PrismaModule, ContractsModule, OrdersModule, TourPackageModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
