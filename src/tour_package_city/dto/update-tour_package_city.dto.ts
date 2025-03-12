import { PartialType } from '@nestjs/swagger';
import { CreateTourPackageCityDto } from './create-tour_package_city.dto';

export class UpdateTourPackageCityDto extends PartialType(CreateTourPackageCityDto) {}
