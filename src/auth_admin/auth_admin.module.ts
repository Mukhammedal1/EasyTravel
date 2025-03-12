import { Module } from "@nestjs/common";
import { AuthAdminService } from "./auth_admin.service";
import { AuthAdminController } from "./auth_admin.controller";
import { JwtModule } from "@nestjs/jwt";
import { AdminModule } from "../admin/admin.module";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.ADMIN_ACCESS_TOKEN_KEY,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_TIME },
    }),
    AdminModule,
  ],
  controllers: [AuthAdminController],
  providers: [AuthAdminService],
})
export class AuthAdminModule {}
