import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Max, MaxLength } from "class-validator";

export class CreateAviaTicketDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  aviacompany_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  departure_airport: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  arrival_airport: string;

  @ApiProperty()
  @IsNotEmpty()
  departure_time: Date;

  @ApiProperty()
  @IsNotEmpty()
  arrival_time: Date;

  @ApiProperty()
  @IsNotEmpty()
  @Max(40, { message: "Yuk hajmi maksimal 40 kg dan oshmasligi kerak" })
  baggage: number;

  @ApiProperty()
  @IsNotEmpty()
  ticket_class: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(500, { message: "500 ta belgidan kam bo'lishi kerak" })
  extra_services: string;

}
