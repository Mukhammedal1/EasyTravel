import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TourPackageCityService } from './tour_package_city.service';
import { CreateTourPackageCityDto } from './dto/create-tour_package_city.dto';
import { UpdateTourPackageCityDto } from './dto/update-tour_package_city.dto';

@Controller('tour-package-city')
export class TourPackageCityController {
  constructor(private readonly tourPackageCityService: TourPackageCityService) {}

  @Post()
  create(@Body() createTourPackageCityDto: CreateTourPackageCityDto) {
    return this.tourPackageCityService.create(createTourPackageCityDto);
  }

  @Get()
  findAll() {
    return this.tourPackageCityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tourPackageCityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTourPackageCityDto: UpdateTourPackageCityDto) {
    return this.tourPackageCityService.update(+id, updateTourPackageCityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tourPackageCityService.remove(+id);
  }
}
