import { PartialType } from '@nestjs/swagger';
import { CreateVisaPolicyDto } from './create-visa_policy.dto';

export class UpdateVisaPolicyDto extends PartialType(CreateVisaPolicyDto) {}
