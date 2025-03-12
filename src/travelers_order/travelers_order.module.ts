import { Module } from "@nestjs/common";
import { TravelersOrderService } from "./travelers_order.service";
import { TravelersOrderController } from "./travelers_order.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [TravelersOrderController],
  providers: [TravelersOrderService],
  exports: [TravelersOrderService],
})
export class TravelersOrderModule {}
