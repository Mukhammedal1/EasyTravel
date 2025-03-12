import { Module } from "@nestjs/common";
import { ImagesService } from "./images.service";
import { ImagesController } from "./images.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { FileModule } from "../file/file.module";

@Module({
  imports: [PrismaModule, FileModule],
  controllers: [ImagesController],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
