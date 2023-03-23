import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { PrismaService } from '../common/services/prisma.service';

@Module({
  providers: [ServiceService, PrismaService],
  controllers: [ServiceController]
})
export class ServiceModule {}
