import { PartialType } from '@nestjs/swagger';
import { CreateTravelersOrderDto } from './create-travelers_order.dto';

export class UpdateTravelersOrderDto extends PartialType(CreateTravelersOrderDto) {}
