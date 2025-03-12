import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateTravelerVisaInfoDto } from "./dto/create-traveler_visa_info.dto";
import { UpdateTravelerVisaInfoDto } from "./dto/update-traveler_visa_info.dto";
import { PrismaService } from "../prisma/prisma.service";
import { TravelersService } from "../travelers/travelers.service";
import { OrdersService } from "../orders/orders.service";
import { TourPackageService } from "../tour_package/tour_package.service";
import { AviaTicketsService } from "../avia_tickets/avia_tickets.service";
import { TravelersOrderService } from "../travelers_order/travelers_order.service";
import { ContractsService } from "../contracts/contracts.service";

@Injectable()
export class TravelerVisaInfoService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly travelerService: TravelersService,
    private readonly travelersOrderService: TravelersOrderService,
    private readonly orderService: OrdersService,
    private readonly tourpackageService: TourPackageService,
    private readonly aviaTicketService: AviaTicketsService,
    private readonly contractService: ContractsService
  ) {}
  async create(createTravelerVisaInfoDto: CreateTravelerVisaInfoDto) {
    const { expiry_date, travelersId, ...data } = createTravelerVisaInfoDto;
    const formatted_date = new Date(expiry_date);
    const travelersId2 = Number(travelersId);
    const travelers = await this.travelerService.findOne(travelersId);
    if (!travelers) {
      throw new BadRequestException("Traveler not found");
    }
    const order = await this.orderService.findOne(travelers.ordersId);
    if (!order) {
      throw new BadRequestException("order not found");
    }
    const tour_package = await this.tourpackageService.findOne(
      order.tourPackageId
    );
    if (!tour_package) {
      throw new BadRequestException("TourPackage not found");
    }
    const avia_ticket = await this.aviaTicketService.findOne(
      tour_package.aviaTicketsId
    );
    if (!avia_ticket) {
      throw new BadRequestException("AviaTicket not found");
    }
    const departureTime = new Date(avia_ticket.departure_time);
    departureTime.setDate(departureTime.getDate() + tour_package.duration);
    const expiryDateStr = formatted_date.toISOString().split("T")[0];
    const departureDateStr = departureTime.toISOString().split("T")[0];
    console.log(expiryDateStr, departureDateStr);
    if (expiryDateStr < departureDateStr) {
      const TO = await this.travelersOrderService.findOneByTO(
        travelersId2,
        travelers.ordersId
      );
      if (!TO) {
        throw new NotFoundException("TravelersOrder not found");
      }
      console.log(expiryDateStr);
      await this.travelersOrderService.remove(TO.id);
      await this.travelerService.remove(travelersId2);
      await this.orderService.remove(travelers.ordersId);

      return {
        message:
          "Viza amal qilish muddati turpaket davomiyligiga to'g'ri kelmaydi",
      };
      //redirect qilinadi turpaketlar royxatiga
    }
    const visainfo = await this.prismaService.travelerVisaInfo.create({
      data: { ...data, expiry_date: formatted_date, travelersId: travelersId2 },
    });
    const contarctDto = {
      terms: "Shartlar, qoidalar",
      payment_status: "pending",
      adminId: 1,
      ordersId: order.id,
    };
    const contract = await this.contractService.create(contarctDto);
    return {
      id: contract.contract.id,
      message: "Malumotlar saqlandi va kontrakt tuzildi",
    };
  }

  findAll() {
    return this.prismaService.travelerVisaInfo.findMany({
      include: { Travelers: true },
    });
  }

  findOne(id: number) {
    return this.prismaService.travelerVisaInfo.findUnique({ where: { id } });
  }

  update(id: number, updateTravelerVisaInfoDto: UpdateTravelerVisaInfoDto) {
    return this.prismaService.travelerVisaInfo.update({
      where: { id },
      data: updateTravelerVisaInfoDto,
    });
  }

  remove(id: number) {
    return this.prismaService.travelerVisaInfo.delete({ where: { id } });
  }
}
