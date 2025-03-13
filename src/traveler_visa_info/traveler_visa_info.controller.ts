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
import { TravelerVisaInfoService } from "./traveler_visa_info.service";
import { CreateTravelerVisaInfoDto } from "./dto/create-traveler_visa_info.dto";
import { UpdateTravelerVisaInfoDto } from "./dto/update-traveler_visa_info.dto";
import { JwtAuthGuard } from "../guards/jwt_auth_guard";
import { AdminGuard } from "../guards/isAdminGuard";

@Controller("traveler-visa-info")
export class TravelerVisaInfoController {
  constructor(
    private readonly travelerVisaInfoService: TravelerVisaInfoService
  ) {}

  @Post()
  create(@Body() createTravelerVisaInfoDto: CreateTravelerVisaInfoDto) {
    return this.travelerVisaInfoService.create(createTravelerVisaInfoDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  findAll() {
    return this.travelerVisaInfoService.findAll();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.travelerVisaInfoService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTravelerVisaInfoDto: UpdateTravelerVisaInfoDto
  ) {
    return this.travelerVisaInfoService.update(+id, updateTravelerVisaInfoDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.travelerVisaInfoService.remove(+id);
  }
}
