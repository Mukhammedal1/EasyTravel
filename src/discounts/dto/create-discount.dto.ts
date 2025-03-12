import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateDiscountDto {
  @ApiProperty()
  @IsNotEmpty()
  discount_value: number;

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
  @IsString()
  description: string;
}
