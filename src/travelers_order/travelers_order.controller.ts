import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TravelersOrderService } from './travelers_order.service';
import { CreateTravelersOrderDto } from './dto/create-travelers_order.dto';
import { UpdateTravelersOrderDto } from './dto/update-travelers_order.dto';

@Controller('travelers-order')
export class TravelersOrderController {
  constructor(private readonly travelersOrderService: TravelersOrderService) {}

  @Post()
  create(@Body() createTravelersOrderDto: CreateTravelersOrderDto) {
    return this.travelersOrderService.create(createTravelersOrderDto);
  }

  @Get()
  findAll() {
    return this.travelersOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelersOrderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTravelersOrderDto: UpdateTravelersOrderDto) {
    return this.travelersOrderService.update(+id, updateTravelersOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelersOrderService.remove(+id);
  }
}
