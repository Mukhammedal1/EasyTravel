import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

export class CreateTourPackageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  price?: number;

  @ApiProperty()
  @IsNotEmpty()
  @Max(30, { message: "Sayohat kuni maksimal 30 kun bo'lishi kerak" })
  @Min(3, { message: "Sayohat kuni minimal 3 kun bo'lishi kerak" })
  duration: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString(
    {},
    { message: "Valid_from formati noto'g'ri! YYYY-MM-DD formatda kiriting." }
  )
  valid_from: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString(
    {},
    { message: "Valid_to formati noto'g'ri! YYYY-MM-DD formatda kiriting." }
  )
  valid_to: Date;

  @ApiProperty()
  @IsNotEmpty()
  available_seats: number;

  @ApiProperty()
  @IsNotEmpty()
  is_active: boolean;

  @ApiProperty()
  @IsNotEmpty()
  cityId: number;

  @ApiProperty()
  @IsNotEmpty()
  insuranceId: number;

  @ApiProperty()
  @IsNotEmpty()
  aviaTicketsId: number;

  @ApiProperty()
  @IsNotEmpty()
  hotelsId: number;

  @ApiProperty()
  @IsOptional()
  discountsId?: number;
}
