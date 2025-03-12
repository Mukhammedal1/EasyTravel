import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { AviaTicketsService } from "./avia_tickets.service";
import { CreateAviaTicketDto } from "./dto/create-avia_ticket.dto";
import { UpdateAviaTicketDto } from "./dto/update-avia_ticket.dto";
import { JwtAuthGuard } from "../guards/jwt_auth_guard";
import { AdminGuard } from "../guards/isAdminGuard";

@Controller("avia-tickets")
export class AviaTicketsController {
  constructor(private readonly aviaTicketsService: AviaTicketsService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() createAviaTicketDto: CreateAviaTicketDto) {
    return this.aviaTicketsService.create(createAviaTicketDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  findAll() {
    return this.aviaTicketsService.findAll();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.aviaTicketsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateAviaTicketDto: UpdateAviaTicketDto
  ) {
    return this.aviaTicketsService.update(+id, updateAviaTicketDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.aviaTicketsService.remove(+id);
  }
}
