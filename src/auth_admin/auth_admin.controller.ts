import { Controller, Post, Body, Param, HttpCode, Res } from "@nestjs/common";
import { AuthAdminService } from "./auth_admin.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AdminSignInDto, CreateAdminDto } from "../admin/dto";
import { Response } from "express";
import { CookieGetter } from "../decorators/cookie-getter.decorator";

@Controller("auth-admin")
export class AuthAdminController {
  constructor(private readonly authAdminService: AuthAdminService) {}

  @ApiOperation({ summary: "Yangi Admin qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi qo'shilgan Admin",
    type: String,
  })

  // @Post("signup")
  // async signUp(@Body() createAdminDto: CreateAdminDto) {
  //   return this.authAdminService.signUp(createAdminDto);
  // }

  @ApiOperation({ summary: "Tizimga kirish" })
  @HttpCode(200)
  @Post("signin")
  async signIn(
    @Body() signInDto: AdminSignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authAdminService.signIn(signInDto, res);
  }

  @HttpCode(200)
  @Post("signout")
  signout(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authAdminService.signOut(refreshToken, res);
  }

  @HttpCode(200)
  @Post("refresh/:id")
  refresh(
    @Param("id") id: number,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authAdminService.refreshToken(+id, refreshToken, res);
  }
}
