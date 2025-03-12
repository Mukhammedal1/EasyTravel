import { PartialType } from '@nestjs/swagger';
import { CreateAviaTicketDto } from './create-avia_ticket.dto';

export class UpdateAviaTicketDto extends PartialType(CreateAviaTicketDto) {}
