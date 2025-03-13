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
import { InsuranceService } from "./insurance.service";
import { CreateInsuranceDto } from "./dto/create-insurance.dto";
import { UpdateInsuranceDto } from "./dto/update-insurance.dto";
import { JwtAuthGuard } from "../guards/jwt_auth_guard";
import { AdminGuard } from "../guards/isAdminGuard";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth()

@Controller("insurance")
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() createInsuranceDto: CreateInsuranceDto) {
    return this.insuranceService.create(createInsuranceDto);
  }
  
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  findAll() {
    return this.insuranceService.findAll();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.insuranceService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateInsuranceDto: UpdateInsuranceDto
  ) {
    return this.insuranceService.update(+id, updateInsuranceDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.insuranceService.remove(+id);
  }
}
