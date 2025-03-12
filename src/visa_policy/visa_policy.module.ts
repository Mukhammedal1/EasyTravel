import { Module } from '@nestjs/common';
import { VisaPolicyService } from './visa_policy.service';
import { VisaPolicyController } from './visa_policy.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [VisaPolicyController],
  providers: [VisaPolicyService],
})
export class VisaPolicyModule {}
