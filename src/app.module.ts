import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { CustomersModule } from "./customers/customers.module";
import { AuthCustomerModule } from "./auth_customer/auth_customer.module";
import { MailModule } from "./mail/mail.module";
import { ConfigModule } from "@nestjs/config";
import { AdminModule } from './admin/admin.module';
import { AuthAdminModule } from './auth_admin/auth_admin.module';
import { CountryModule } from './country/country.module';
import { CityModule } from './city/city.module';
import { VisaPolicyModule } from './visa_policy/visa_policy.module';
import { InsuranceModule } from './insurance/insurance.module';
import { DiscountsModule } from './discounts/discounts.module';
import { AviaTicketsModule } from './avia_tickets/avia_tickets.module';
import { TourPackageModule } from './tour_package/tour_package.module';
import { TourPackageCityModule } from './tour_package_city/tour_package_city.module';
import { HotelsModule } from './hotels/hotels.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ImagesModule } from './images/images.module';
import { ContractsModule } from './contracts/contracts.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { TravelersModule } from './travelers/travelers.module';
import { TravelersOrderModule } from './travelers_order/travelers_order.module';
import { TravelerVisaInfoModule } from './traveler_visa_info/traveler_visa_info.module';
import { FileModule } from "./file/file.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AppController } from "./app.controller";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"), // Statik fayllar uchun (CSS, JS, Images)
    }),
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    PrismaModule,
    CustomersModule,
    AuthCustomerModule,
    MailModule,
    AdminModule,
    AuthAdminModule,
    CountryModule,
    CityModule,
    VisaPolicyModule,
    InsuranceModule,
    DiscountsModule,
    AviaTicketsModule,
    TourPackageModule,
    TourPackageCityModule,
    HotelsModule,
    ReviewsModule,
    ImagesModule,
    ContractsModule,
    OrdersModule,
    PaymentsModule,
    TravelersModule,
    TravelersOrderModule,
    TravelerVisaInfoModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
