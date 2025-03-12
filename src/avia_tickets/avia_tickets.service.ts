import { Injectable } from "@nestjs/common";
import { CreateAviaTicketDto } from "./dto/create-avia_ticket.dto";
import { UpdateAviaTicketDto } from "./dto/update-avia_ticket.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AviaTicketsService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createAviaTicketDto: CreateAviaTicketDto) {
    return this.prismaService.aviaTickets.create({ data: createAviaTicketDto });
  }

  findAll() {
    return this.prismaService.aviaTickets.findMany({
      include: { tour_package: true },
    });
  }

  findOne(id: number) {
    return this.prismaService.aviaTickets.findUnique({ where: { id } });
  }

  update(id: number, updateAviaTicketDto: UpdateAviaTicketDto) {
    return this.prismaService.aviaTickets.update({
      where: { id },
      data: updateAviaTicketDto,
    });
  }

  remove(id: number) {
    return this.prismaService.aviaTickets.delete({ where: { id } });
  }
}
