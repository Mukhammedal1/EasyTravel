import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VisaPolicyService } from './visa_policy.service';
import { CreateVisaPolicyDto } from './dto/create-visa_policy.dto';
import { UpdateVisaPolicyDto } from './dto/update-visa_policy.dto';

@Controller('visa-policy')
export class VisaPolicyController {
  constructor(private readonly visaPolicyService: VisaPolicyService) {}

  @Post()
  create(@Body() createVisaPolicyDto: CreateVisaPolicyDto) {
    return this.visaPolicyService.create(createVisaPolicyDto);
  }

  @Get()
  findAll() {
    return this.visaPolicyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visaPolicyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVisaPolicyDto: UpdateVisaPolicyDto) {
    return this.visaPolicyService.update(+id, updateVisaPolicyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visaPolicyService.remove(+id);
  }
}
