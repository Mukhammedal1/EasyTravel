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
import { ImagesService } from "./images.service";
import { CreateImageDto } from "./dto/create-image.dto";
import { UpdateImageDto } from "./dto/update-image.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../guards/jwt_auth_guard";
import { AdminGuard } from "../guards/isAdminGuard";

@ApiBearerAuth()
@Controller("images")
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @UseInterceptors(FileInterceptor("image"))
  @Post()
  create(@Body() createImageDto: CreateImageDto, @UploadedFile() image: any) {
    return this.imagesService.create(createImageDto, image);
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.imagesService.findOne(Number(id));
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(+id, updateImageDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.imagesService.remove(+id);
  }
}
