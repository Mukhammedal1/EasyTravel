import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateContractDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  terms: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  payment_status: string;

  @ApiProperty()
  @IsNotEmpty()
  adminId: number;

  @ApiProperty()
  @IsNotEmpty()
  ordersId: number;
}
