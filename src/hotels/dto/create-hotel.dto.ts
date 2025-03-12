import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateHotelDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  stars_level: number;

  @ApiProperty()
  @IsNotEmpty()
  price_per_night: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "Checkin_time 'HH:MM' formatida bo'lishi kerak (masalan 14:00)",
  })
  checkin_time: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "Checkout_time vaqti 'HH:MM' formatida bo'lishi kerak (masalan 14:00)",
  })
  checkout_time: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  includes_services: string;

  @ApiProperty()
  @IsNotEmpty()
  cityId: number;
}
