import { Injectable } from "@nestjs/common";
import { CreateImageDto } from "./dto/create-image.dto";
import { UpdateImageDto } from "./dto/update-image.dto";
import { PrismaService } from "../prisma/prisma.service";
import { FileService } from "../file/file.service";

@Injectable()
export class ImagesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileService: FileService
  ) {}
  async create(createImageDto: CreateImageDto, image: any) {
    const { hotelsId } = createImageDto;
    const hotelsId2 = Number(hotelsId);
    const fileName = await this.fileService.saveFile(image);
    return this.prismaService.images.create({
      data: { hotelsId: hotelsId2, image_url: fileName },
    });
  }

  findAll() {
    return this.prismaService.images.findMany({ include: { Hotels: true } });
  }

  findOne(id: number) {
    return this.prismaService.images.findUnique({ where: { id } });
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return this.prismaService.images.update({
      where: { id },
      data: updateImageDto,
    });
  }

  remove(id: number) {
    return this.prismaService.images.delete({ where: { id } });
  }
}
