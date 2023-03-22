import { Module } from '@nestjs/common';
import { BannerController } from './banner.controller';
import { BannerService } from './banner.service';
import { PrismaService } from '../common/services/prisma.service';

@Module({
  providers: [BannerService, PrismaService],
  controllers: [BannerController],
})
export class BannerModule {}
