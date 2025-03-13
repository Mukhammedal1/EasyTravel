import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SearchTourPackageByCityDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city_name: string;
}
