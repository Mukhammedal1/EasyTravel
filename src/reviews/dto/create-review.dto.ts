import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateReviewDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  comment: string;

  @ApiProperty()
  @IsNotEmpty()
  customersId: number;

  @ApiProperty()
  @IsNotEmpty()
  tourPackageId: number;
}
