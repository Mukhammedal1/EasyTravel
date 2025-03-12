import { Module } from "@nestjs/common";
import { AuthCustomerService } from "./auth_customer.service";
import { AuthCustomerController } from "./auth_customer.controller";
import { JwtModule } from "@nestjs/jwt";
import { CustomersModule } from "../customers/customers.module";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.CUSTOMER_ACCESS_TOKEN_KEY,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_TIME },
    }),
    CustomersModule,
  ],
  controllers: [AuthCustomerController],
  providers: [AuthCustomerService],
})
export class AuthCustomerModule {}
