import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TravelerVisaInfoService } from './traveler_visa_info.service';
import { CreateTravelerVisaInfoDto } from './dto/create-traveler_visa_info.dto';
import { UpdateTravelerVisaInfoDto } from './dto/update-traveler_visa_info.dto';

@Controller('traveler-visa-info')
export class TravelerVisaInfoController {
  constructor(private readonly travelerVisaInfoService: TravelerVisaInfoService) {}

  @Post()
  create(@Body() createTravelerVisaInfoDto: CreateTravelerVisaInfoDto) {
    return this.travelerVisaInfoService.create(createTravelerVisaInfoDto);
  }

  @Get()
  findAll() {
    return this.travelerVisaInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelerVisaInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTravelerVisaInfoDto: UpdateTravelerVisaInfoDto) {
    return this.travelerVisaInfoService.update(+id, updateTravelerVisaInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelerVisaInfoService.remove(+id);
  }
}
