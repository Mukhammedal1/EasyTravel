import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTravelersOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  ordersId: number;

  @ApiProperty()
  @IsNotEmpty()
  travelersId: number;
}
