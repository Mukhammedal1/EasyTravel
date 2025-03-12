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
import { TravelersService } from "./travelers.service";
import { CreateTravelerDto } from "./dto/create-traveler.dto";
import { UpdateTravelerDto } from "./dto/update-traveler.dto";
import { JwtAuthGuard } from "../guards/jwt_auth_guard";
import { AdminGuard } from "../guards/isAdminGuard";

@Controller("travelers")
export class TravelersController {
  constructor(private readonly travelersService: TravelersService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() createTravelerDto: CreateTravelerDto) {
    return this.travelersService.create(createTravelerDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  findAll() {
    return this.travelersService.findAll();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.travelersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTravelerDto: UpdateTravelerDto
  ) {
    return this.travelersService.update(+id, updateTravelerDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.travelersService.remove(+id);
  }
}
