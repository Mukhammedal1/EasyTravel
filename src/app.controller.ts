import { Controller, Get, Param, Render, Res } from "@nestjs/common";
import { TourPackageService } from "./tour_package/tour_package.service";
import { ImagesService } from "./images/images.service";
import { HotelsService } from "./hotels/hotels.service";
import { PrismaService } from "./prisma/prisma.service";
import { OrdersService } from "./orders/orders.service";
import { CookieGetter } from "./decorators/cookie-getter.decorator";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { CustomersService } from "./customers/customers.service";
import { ContractsService } from "./contracts/contracts.service";

@Controller("api")
export class AppController {
  constructor(
    private readonly tourPackageService: TourPackageService,
    private readonly imageService: ImagesService,
    private readonly contractService: ContractsService,
    private readonly customerService: CustomersService,
    private readonly hotelService: HotelsService,
    private readonly prismaService: PrismaService,
    private readonly orderService: OrdersService,
    private readonly jwtService: JwtService
  ) {}
  @Get()
  @Render("index")
  async getAllTourPackages() {
    // const tourPackages = await this.tourPackageService.findAll();
    return;
  }

  @Get("register")
  @Render("register")
  async Registr() {
    return;
  }

  @Get("signup")
  @Render("signup")
  async SignUp() {
    return;
  }

  @Get("about")
  @Render("about")
  async about() {
    return;
  }

  @Get("tourpackages")
  @Render("tourpackages")
  async ShowTourPackages() {
    const tourPackages = await this.tourPackageService.findAll();
    return { tourPackages };
  }

  @Get("travelerform/:id")
  @Render("traveler_forma")
  async TravelerForm(
    @Param("id") id: string,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res() res: Response
  ) {
    if (!refreshToken) {
      return res.redirect("/api/signup");
    }

    const decodedToken = await this.jwtService.decode(refreshToken);
    if (!decodedToken || !decodedToken["id"]) {
      return res.redirect("/api/signup");
    }

    const customerId = decodedToken["id"];
    const customer = await this.prismaService.customers.findUnique({
      where: { id: customerId },
    });
    if (!customer) {
      return res.redirect("/api/signup");
    }
    const tourPackage = await this.tourPackageService.findOne(+id);
    console.log(customerId, tourPackage?.id);
    const order = await this.orderService.create({
      tourPackageId: Number(tourPackage?.id),
      customersId: customerId,
    });
    return { tourPackage, order };
  }

  @Get("package/:id")
  @Render("package")
  async AboutPackage(@Param("id") id: string) {
    const tourPackage = await this.tourPackageService.findOne(+id);
    const hotel = await this.hotelService.findOne(tourPackage?.hotelsId!);
    const image = await this.prismaService.images.findFirst({
      where: { hotelsId: hotel?.id },
    });
    return { tourPackage, image };
  }

  @Get("visainfo/:id")
  @Render("visainfo")
  async Visa(@Param("id") id: string) {
    const id2 = Number(id);
    return { id2 };
  }

  @Get("contract/:id")
  @Render("contract")
  async Contract(@Param("id") id: string) {
    const id2 = Number(id);
    const contract = await this.contractService.findOne(id2);
    console.log(contract?.Orders?.travelers[0]);
    return { contract };
  }
}
