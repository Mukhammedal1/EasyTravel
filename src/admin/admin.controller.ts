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
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { AdminCreatorGuard } from "../guards/admin_creator_guard";
import { JwtAuthGuard } from "../guards/jwt_auth_guard";
import { AdminSelfGuard } from "../guards/admin_self_guard";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth()
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @UseGuards(AdminAuthGuard, AdminCreatorGuard)
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @UseGuards(JwtAuthGuard, AdminCreatorGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(JwtAuthGuard, AdminSelfGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, AdminSelfGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @UseGuards(JwtAuthGuard, AdminCreatorGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }
}
