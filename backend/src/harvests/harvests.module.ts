import { Module } from '@nestjs/common';
import { HarvestsController } from './harvests.controller';
import { HarvestsService } from './harvests.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [HarvestsController],
  providers: [HarvestsService, PrismaService],
  exports: [HarvestsService],
})
export class HarvestsModule {}
