import { Module } from "@nestjs/common";
import { AviaTicketsService } from "./avia_tickets.service";
import { AviaTicketsController } from "./avia_tickets.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [AviaTicketsController],
  providers: [AviaTicketsService],
  exports: [AviaTicketsService],
})
export class AviaTicketsModule {}
