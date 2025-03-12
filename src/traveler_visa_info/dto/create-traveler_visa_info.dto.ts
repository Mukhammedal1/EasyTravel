import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateTravelerVisaInfoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  visa_type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString(
    {},
    { message: "expiry_date formati noto'g'ri! YYYY-MM-DD formatda kiriting." }
  )
  expiry_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  travelersId: number;
}
