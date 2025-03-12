import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  MinLength,
} from "class-validator";

export class CreateTravelerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: "Kamida 3 ta harfdan iborat bo'lishi kerak" })
  fullname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber("UZ", { message: "Telefon raqam noto'g'ri formatda" })
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: "Email noto'g'ri formatda" })
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  age: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  gender: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Z]{2}\d{7}$/, {
    message: "Pasport seriya va raqami noto'g'ri! To'g'ri format: AA1234567",
  })
  passport_info: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString(
    {},
    { message: "Tug'ilgan sana noto'g'ri! YYYY-MM-DD formatda kiriting." }
  )
  birth_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  is_exist_visa: boolean;

  @ApiProperty()
  @IsNotEmpty()
  ordersId: number;
}
