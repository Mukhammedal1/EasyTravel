import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from "@nestjs/common";
import { CreateContractDto } from "./dto/create-contract.dto";
import { UpdateContractDto } from "./dto/update-contract.dto";
import { PrismaService } from "../prisma/prisma.service";
import { OrdersService } from "../orders/orders.service";
import { TourPackageService } from "../tour_package/tour_package.service";
import { TravelersService } from "../travelers/travelers.service";
import { CustomersService } from "../customers/customers.service";
import { AviaTicketsService } from "../avia_tickets/avia_tickets.service";
import { HotelsService } from "../hotels/hotels.service";
import { InsuranceService } from "../insurance/insurance.service";
import { AdminService } from "../admin/admin.service";

@Injectable()
export class ContractsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly orderService: OrdersService,
    private readonly tourPackageService: TourPackageService,
    private readonly customerService: CustomersService,
    private readonly aviaTicketService: AviaTicketsService,
    private readonly hotelService: HotelsService,
    private readonly insuranceService: InsuranceService,
    private readonly AdminService: AdminService
  ) {}
  async create(createContractDto: CreateContractDto) {
    const { ordersId, adminId, ...data } = createContractDto;
    const order = await this.orderService.findOne(ordersId);
    if (!order) {
      throw new BadRequestException("Order not found");
    }
    const tour_package = await this.tourPackageService.findOne(
      order.tourPackageId
    );
    if (!tour_package) {
      throw new BadRequestException("TourPackage not found");
    }
    const start_date = new Date();
    const end_date = new Date(start_date);
    end_date.setDate(end_date.getDate() + tour_package.duration);
    const payment_deadline = new Date(start_date);
    payment_deadline.setDate(payment_deadline.getDate() + 1);

    const contract = await this.prismaService.contracts.create({
      data: {
        ...data,
        start_date,
        end_date,
        payment_deadline,
        ordersId,
        adminId,
      },
    });

    const customer = await this.customerService.findOne(order.customersId);
    if (!customer) {
      throw new BadRequestException("Customer not found");
    }
    const avia_ticket = await this.aviaTicketService.findOne(
      tour_package.aviaTicketsId
    );
    if (!avia_ticket) {
      throw new BadRequestException("AviaTicket not found");
    }
    const hotel = await this.hotelService.findOne(tour_package.hotelsId);
    if (!hotel) {
      throw new BadRequestException("Hotel not found");
    }
    const insurance = await this.insuranceService.findOne(
      tour_package.insuranceId
    );
    if (!insurance) {
      throw new BadRequestException("Insurance not found");
    }
    const valid_from = avia_ticket.departure_time;
    const valid_to = new Date(valid_from);
    valid_to.setDate(valid_to.getDate() + tour_package.duration);

    await this.insuranceService.update(insurance.id, { valid_from, valid_to });
    const admin = await this.AdminService.findOne(adminId);
    if (!admin) {
      throw new BadRequestException("Admin not found");
    }

    return {
      contract,
      admin,
      tour_package,
      avia_ticket,
      hotel,
      insurance,
      customer,
    };
  }

  findAll() {
    return this.prismaService.contracts.findMany({
      include: {
        Admin: true,
        Orders: {
          include: {
            TourPackage: {
              include: { AviaTickets: true, Hotels: true, Insurance: true },
            },
            travelers: true,
          },
        },
        payment: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.contracts.findUnique({
      where: { id },
      include: {
        Admin: true,
        Orders: {
          include: {
            TourPackage: {
              include: {
                City: true,
                AviaTickets: true,
                Insurance: true,
                Hotels: true,
              },
            },
            travelers: true,
          },
        },
      },
    });
  }

  update(id: number, updateContractDto: UpdateContractDto) {
    return this.prismaService.contracts.update({
      where: { id },
      data: updateContractDto,
    });
  }

  remove(id: number) {
    return this.prismaService.contracts.delete({ where: { id } });
  }
}
