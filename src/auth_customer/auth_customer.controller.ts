import { Body, Controller, HttpCode, Param, Post, Res } from '@nestjs/common';
import { AuthCustomerService } from './auth_customer.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCustomerDto, CustomerSignInDto } from '../customers/dto';
import { Response } from 'express';
import { CookieGetter } from '../decorators/cookie-getter.decorator';

@Controller("auth-customer")
export class AuthCustomerController {
  constructor(private readonly authCustomerService: AuthCustomerService) {}

  @ApiOperation({ summary: "Yangi foydalanuvchi ro'yxatdan o'tlazish" })
  @ApiResponse({
    status: 201,
    description: "Ro'yxatdan o'tgan foydalanuvchi",
    type: String,
  })
  @Post("signup")
  async signUp(@Body() createCustomerDto: CreateCustomerDto) {
    return this.authCustomerService.signUp(createCustomerDto);
  }

  @ApiOperation({ summary: "Tizimga kirish" })
  @HttpCode(200)
  @Post("signin")
  async signIn(
    @Body() signInDto: CustomerSignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authCustomerService.signIn(signInDto, res);
  }

  @HttpCode(200)
  @Post("signout")
  signout(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authCustomerService.signOut(refreshToken, res);
  }

  @HttpCode(200)
  @Post("refresh/:id")
  refresh(
    @Param("id") id: number,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authCustomerService.refreshToken(+id, refreshToken, res);
  }
}
