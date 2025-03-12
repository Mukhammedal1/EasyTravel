import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from "@nestjs/common";
import { TourPackageService } from "./tour_package.service";
import { CreateTourPackageDto } from "./dto/create-tour_package.dto";
import { UpdateTourPackageDto } from "./dto/update-tour_package.dto";
import { SearchTourPackageByDateDto } from "./dto/search-tour-package.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "../guards/jwt_auth_guard";
import { AdminGuard } from "../guards/isAdminGuard";

@Controller("tour-package")
export class TourPackageController {
  constructor(private readonly tourPackageService: TourPackageService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() createTourPackageDto: CreateTourPackageDto) {
    return this.tourPackageService.create(createTourPackageDto);
  }

  @Get()
  findAll() {
    return this.tourPackageService.findAll();
  }

  @Post("searchdate")
  findByBetweenDate(
    @Body() searchTourPackageByDateDto: SearchTourPackageByDateDto
  ) {
    return this.tourPackageService.findByBetweenDate(
      searchTourPackageByDateDto
    );
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @UseInterceptors(FileInterceptor("image"))
  @Patch("image/:id")
  async updateTourPackageImage(
    @Param("id") id: string,
    @UploadedFile() image: any
  ) {
    return this.tourPackageService.updateTourPackageImage(+id, image);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.tourPackageService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTourPackageDto: UpdateTourPackageDto
  ) {
    return this.tourPackageService.update(+id, updateTourPackageDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.tourPackageService.remove(+id);
  }
}
