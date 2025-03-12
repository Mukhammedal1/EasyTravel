import { PartialType } from '@nestjs/swagger';
import { CreateTravelerVisaInfoDto } from './create-traveler_visa_info.dto';

export class UpdateTravelerVisaInfoDto extends PartialType(CreateTravelerVisaInfoDto) {}
