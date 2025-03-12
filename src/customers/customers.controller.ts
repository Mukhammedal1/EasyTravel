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
import { CustomersService } from "./customers.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { JwtAuthGuard } from "../guards/jwt_auth_guard";
import { CustomerSelfGuard } from "../guards/customer_self_guard";
import { AdminSelfGuard } from "../guards/admin_self_guard";
import { AdminGuard } from "../guards/isAdminGuard";

@Controller("customers")
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @UseGuards(JwtAuthGuard, AdminSelfGuard)
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @UseGuards(JwtAuthGuard, CustomerSelfGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.customersService.findOne(+id);
  }

  @Get("activate/:link")
  activate(@Param("link") link: string) {
    return this.customersService.activate(link);
  }

  @UseGuards(JwtAuthGuard, CustomerSelfGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.customersService.remove(+id);
  }
}
