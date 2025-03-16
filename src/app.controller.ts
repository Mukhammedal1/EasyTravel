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
import moment from "moment";

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
    const tourPackages2 = await this.tourPackageService.findAll();
    const tourPackages:any=[]
    tourPackages.push(tourPackages2[0])
    tourPackages.push(tourPackages2[1])
    tourPackages.push(tourPackages2[3]);
    return {tourPackages}
  }

  @Get("signin")
  @Render("signin")
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
    let tourPackages = await this.tourPackageService.findAll();

    tourPackages = tourPackages.map((tour) => ({
      ...tour,
      valid_from2: new Date(tour.valid_from)
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "."),
      valid_to2: new Date(tour.valid_to)
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "."),
      departure_time2: tour.AviaTickets?.departure_time
        ? new Date(tour.AviaTickets.departure_time)
            .toISOString()
            .slice(0, 10)
            .replace(/-/g, ".")
        : "Noma'lum",
    }));

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
    return { contract };
  }
}
