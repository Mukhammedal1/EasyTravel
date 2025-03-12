import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class CreateInsuranceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  company_name: string;

  @ApiProperty()
  @IsOptional()
  valid_from?: Date;

  @ApiProperty()
  @IsOptional()
  valid_to?: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(500, { message: "Matn hajmi 500 ta belgidan kam bo'lishi kerak" })
  insurance_roles: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;
}
