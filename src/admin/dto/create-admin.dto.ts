import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  MinLength,
} from "class-validator";

export class CreateAdminDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: "Kamida 3 ta harfdan iborat bo'lishi kerak" })
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: "Email noto'g'ri formatda" })
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber("UZ", { message: "Telefon raqam noto'g'ri formatda" })
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: "Parol kamida 8 ta belgidan iborat bo'lishi kerak" })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: "Parol kamida bitta harf va bitta raqamni o'z ichiga olishi kerak",
  })
  password: string;
}
