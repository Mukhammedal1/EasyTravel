import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from "@nestjs/common";
import { CreateTravelerDto } from "./dto/create-traveler.dto";
import { UpdateTravelerDto } from "./dto/update-traveler.dto";
import { PrismaService } from "../prisma/prisma.service";
import { OrdersService } from "../orders/orders.service";
import { TourPackageService } from "../tour_package/tour_package.service";
import { TravelersOrderService } from "../travelers_order/travelers_order.service";
import { ContractsService } from "../contracts/contracts.service";

@Injectable()
export class TravelersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly orderService: OrdersService,
    private readonly tourPackageService: TourPackageService,
    private readonly travelerOrderService: TravelersOrderService,
    private readonly contractService: ContractsService
  ) {}
  async create(createTravelerDto: CreateTravelerDto) {
    const { ordersId, birth_date, is_exist_visa, age, ...data } =
      createTravelerDto;
    const orderId2 = Number(ordersId);
    const age2 = Number(age);
    const formatted_date = new Date(birth_date);

    const existingTraveler = await this.prismaService.travelers.findFirst({
      where: {
        OR: [
          { phone: data.phone }, // Agar passport_number noyob bo‘lsa
          { email: data.email }, // Agar email noyob bo‘lsa
        ],
      },
    });

    if (existingTraveler) {
      throw new BadRequestException("Bunday sayohatchi mavjud!");
    }

    const order = await this.orderService.findOne(ordersId);
    if (!order) {
      throw new BadRequestException("Order not found");
    }
    const tour_package = await this.tourPackageService.findOne(
      order?.tourPackageId!
    );
    if (!tour_package) {
      throw new BadRequestException("TourPackage not found");
    }
    if (tour_package?.visa_required) {
      if (is_exist_visa) {
        const traveler = await this.prismaService.travelers.create({
          data: {
            ...data,
            birth_date: formatted_date,
            is_exist_visa,
            ordersId: orderId2,
            age: age2,
          },
        });
        await this.travelerOrderService.create({
          travelersId: traveler.id,
          ordersId: orderId2,
        });
        return {
          success: true,
          message: "Malumotlar muvaffaqiyatli saqlandi",
          traveler,
          redirectTo: `/api/visainfo/${traveler.id}`,
        };
      }
      await this.orderService.remove(orderId2);
      return {
        success: false,
        message:
          "Siz sayohat qilmoqchi bo'lgan davlat vizasiz sayohat qilishga ruxsat bermaydi!",
        traveler: { is_exist_visa: false },
        redirectTo: "/api",
      };
      // redirect qilinadi tourpackage ro'yxatiga
    }
    const traveler = await this.prismaService.travelers.create({
      data: {
        ...data,
        birth_date: formatted_date,
        is_exist_visa,
        ordersId: orderId2,
        age: age2,
      },
    });
    await this.travelerOrderService.create({
      travelersId: traveler.id,
      ordersId: orderId2,
    });
    const contarctDto = {
      terms: "Shartlar, qoidalar",
      payment_status: "pending",
      adminId: 1,
      ordersId: order.id,
    };
    const contract = await this.contractService.create(contarctDto);
    return {
      success: true,
      message: "Malumotlar muvaffaqiyatli saqlandi va Kontrakt tuzildi",
      traveler,
      redirectTo: `/api/contract/${contract.contract.id}`,
    };
  }

  findAll() {
    return this.prismaService.travelers.findMany({
      include: {
        traveler_visa_info: true,
        travelers_orders: {
          include: {
            Orders: {
              include: {
                TourPackage: {
                  include: { City: { include: { Country: true } } },
                },
              },
            },
          },
        },
      },
    });
  }

  findOne(id: number) {
    const id2 = Number(id);
    return this.prismaService.travelers.findUnique({ where: { id: id2 } });
  }

  findByOrderId(ordersId: number) {
    return this.prismaService.travelers.findFirst({ where: { ordersId } });
  }

  update(id: number, updateTravelerDto: UpdateTravelerDto) {
    const { birth_date, ...data } = updateTravelerDto;
    const formatted_date = new Date(birth_date!);

    return this.prismaService.travelers.update({
      where: { id },
      data: { ...data, birth_date: formatted_date },
    });
  }

  remove(id: number) {
    const id2 = Number(id);
    return this.prismaService.travelers.delete({ where: { id: id2 } });
  }
}
