import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty } from "class-validator";

export class SearchTourPackageByDateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString(
    {},
    { message: "start_date formati noto'g'ri! YYYY-MM-DD formatda kiriting." }
  )
  start_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString(
    {},
    { message: "end_date formati noto'g'ri! YYYY-MM-DD formatda kiriting." }
  )
  end_date: Date;
}
