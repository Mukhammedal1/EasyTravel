import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTourPackageCityDto {
  @ApiProperty()
  @IsNotEmpty()
  cityId: number;

  @ApiProperty()
  @IsNotEmpty()
  tourPackageId: number;
}
