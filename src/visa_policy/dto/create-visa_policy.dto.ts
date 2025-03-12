import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength } from "class-validator";

export class CreateVisaPolicyDto {
  @ApiProperty()
  @IsNotEmpty()
  visa_proceccing_time: number;
  @ApiProperty()
  @IsNotEmpty()
  duration_month: number;
  @ApiProperty()
  @IsNotEmpty()
  countryId: number;
}
