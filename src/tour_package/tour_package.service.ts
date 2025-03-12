import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateTourPackageDto } from "./dto/create-tour_package.dto";
import { UpdateTourPackageDto } from "./dto/update-tour_package.dto";
import { PrismaService } from "../prisma/prisma.service";
import { AviaTicketsService } from "../avia_tickets/avia_tickets.service";
import { HotelsService } from "../hotels/hotels.service";
import { InsuranceService } from "../insurance/insurance.service";
import { CityService } from "../city/city.service";
import { CountryService } from "../country/country.service";
import { DiscountsService } from "../discounts/discounts.service";
import { TourPackageCityService } from "../tour_package_city/tour_package_city.service";
import { SearchTourPackageByDateDto } from "./dto/search-tour-package.dto";
import { FileService } from "../file/file.service";

@Injectable()
export class TourPackageService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly aviaTicketService: AviaTicketsService,
    private readonly hotelService: HotelsService,
    private readonly insuranceService: InsuranceService,
    private readonly cityService: CityService,
    private readonly countryService: CountryService,
    private readonly discountService: DiscountsService,
    private readonly tourPackageCityService: TourPackageCityService,
    private readonly fileService: FileService
  ) {}
  async create(createTourPackageDto: CreateTourPackageDto) {
    const { valid_from, valid_to, ...data } = createTourPackageDto;
    const formatvalid_from = new Date(valid_from);
    const formatvalid_to = new Date(valid_to);
    let package_price: number = 0;
    const aviaTicket = await this.aviaTicketService.findOne(
      createTourPackageDto.aviaTicketsId
    );
    const hotel = await this.hotelService.findOne(
      createTourPackageDto.hotelsId
    );
    const insurance = await this.insuranceService.findOne(
      createTourPackageDto.insuranceId
    );
    if (aviaTicket) {
      package_price += aviaTicket.price;
    }
    if (hotel) {
      let total_hotel_price =
        hotel.price_per_night * createTourPackageDto.duration;
      package_price += total_hotel_price;
    }
    if (insurance) {
      package_price += insurance.price;
    }
    if (createTourPackageDto.discountsId) {
      const discount = await this.discountService.findDiscountByDate(
        createTourPackageDto.discountsId
      );
      let newPrice = (package_price * discount!.discount_value) / 100;
      package_price -= newPrice;
    }
    const city = await this.cityService.findOne(createTourPackageDto.cityId);
    const country = await this.countryService.findOne(city?.countryId!);
    if (country?.is_visa_required) {
      const tour_package = await this.prismaService.tourPackage.create({
        data: {
          valid_from: formatvalid_from,
          valid_to: formatvalid_to,
          price: package_price,
          visa_required: true,
          ...data,
        },
      });
      await this.tourPackageCityService.create({
        tourPackageId: tour_package.id,
        cityId: createTourPackageDto.cityId,
      });
      return tour_package;
    }
    const tour_package = await this.prismaService.tourPackage.create({
      data: {
        valid_from: formatvalid_from,
        valid_to: formatvalid_to,
        price: package_price,
        ...data,
      },
    });
    await this.tourPackageCityService.create({
      tourPackageId: tour_package.id,
      cityId: createTourPackageDto.cityId,
    });
    return tour_package;
  }

  findAll() {
    return this.prismaService.tourPackage.findMany({
      include: {
        City: true,
        AviaTickets: true,
        Discounts: true,
        Hotels: true,
        Insurance: true,
        reviews: true,
      },
    });
  }

  async findByBetweenDate(
    searchTourPackageByDateDto: SearchTourPackageByDateDto
  ) {
    const { start_date, end_date } = searchTourPackageByDateDto;
    const format_start_date = new Date(start_date);
    const format_end_date = new Date(end_date);

    const tour_packages = await this.prismaService.tourPackage.findMany({
      where: {
        AviaTickets: {
          departure_time: {
            gte: format_start_date,
            lte: format_end_date,
          },
        },
      },
      include: {
        AviaTickets: true,
        Hotels: true,
        Insurance: true,
      },
    });

    if (tour_packages.length === 0) {
      throw new NotFoundException(
        "Ushbu sanalar orasida hech qanday mos turpaket topilmadi."
      );
    }

    return tour_packages;
  }

  async updateTourPackageImage(id: number, image: any) {
    const tourPackage = await this.prismaService.tourPackage.findUnique({
      where: { id },
    });
    if (!tourPackage) {
      throw new NotFoundException("Turpaket topilmadi");
    }
    const fileName = await this.fileService.saveFile(image);

    return this.prismaService.tourPackage.update({
      where: { id },
      data: { image: fileName },
    });
  }

  findOne(id: number) {
    return this.prismaService.tourPackage.findUnique({
      where: { id },
      include: { Hotels: true, AviaTickets: true, Insurance: true },
    });
  }

  update(id: number, updateTourPackageDto: UpdateTourPackageDto) {
    return this.prismaService.tourPackage.update({
      where: { id },
      data: updateTourPackageDto,
    });
  }

  remove(id: number) {
    return this.prismaService.tourPackage.delete({ where: { id } });
  }
}
