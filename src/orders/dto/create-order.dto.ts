import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateOrderDto {

  @ApiProperty()
  @IsNotEmpty()
  customersId: number;

  @ApiProperty()
  @IsNotEmpty()
  tourPackageId: number;
}
