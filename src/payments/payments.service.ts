import { BadRequestException, Injectable } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { PrismaService } from "../prisma/prisma.service";
import { ContractsService } from "../contracts/contracts.service";
import { OrdersService } from "../orders/orders.service";
import { TourPackageService } from "../tour_package/tour_package.service";

@Injectable()
export class PaymentsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly contractService: ContractsService,
    private readonly orderService: OrdersService,
    private readonly tourPackageService: TourPackageService
  ) {}
  async create(createPaymentDto: CreatePaymentDto) {
    const { contractsId, amount, ...data } = createPaymentDto;
    const contract = await this.contractService.findOne(contractsId);
    if (!contract) {
      throw new BadRequestException("Contract not found");
    }
    const order = await this.orderService.findOne(contract.ordersId);
    if (!order) {
      throw new BadRequestException("Order not found");
    }
    const tour_package = await this.tourPackageService.findOne(
      order.tourPackageId
    );
    if (!tour_package) {
      throw new BadRequestException("TourPackage not found");
    }
    const paid_payment = contract.paid_payment! + amount;
    const today = new Date();
    let response: object;
    if (paid_payment < tour_package.price!) {
      if (contract.payment_deadline! >= today) {
        await this.prismaService.payments.create({ data: createPaymentDto });
        response = {
          tolanishi_kerak_edi: tour_package.price,
          jami_tolangan_summa: paid_payment,
          hozirgi_tolangan_summa: amount,
          qolgan_qarz: tour_package.price! - paid_payment,
        };
        await this.prismaService.contracts.update({
          where: { id: contractsId },
          data: { payment_status: "pending", paid_payment },
        });
        return response;
      } else {
        await this.contractService.update(contractsId, {
          payment_status: "failed",
        });
        return "To'lov muddati o'tib ketgan";
      }
    } else if (paid_payment > tour_package.price!) {
      await this.prismaService.payments.create({ data: createPaymentDto });
      response = {
        tolanishi_kerak_edi: tour_package.price,
        jami_tolangan_summa:paid_payment,
        hozir_tolangan_summa: amount,
        ortiqcha_summa: paid_payment - tour_package.price!,
      };
      await this.prismaService.contracts.update({
        where: { id: contractsId },
        data: { payment_status: "completed", paid_payment },
      });
      return response;
    } else {
      await this.prismaService.payments.create({ data: createPaymentDto });
      response = {
        tolanishi_kerak_edi: tour_package.price,
        jami_tolangan_summa: paid_payment,
        hozir_tolangan_summa: amount,
      };
      await this.prismaService.contracts.update({
        where: { id: contractsId },
        data: { payment_status: "completed", paid_payment },
      });
      return response;
    }
  }

  findAll() {
    return this.prismaService.payments.findMany({
      include: { Contracts: true },
    });
  }

  findOne(id: number) {
    return this.prismaService.payments.findUnique({ where: { id } });
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.prismaService.payments.update({
      where: { id },
      data: updatePaymentDto,
    });
  }

  remove(id: number) {
    return this.prismaService.payments.delete({ where: { id } });
  }
}
