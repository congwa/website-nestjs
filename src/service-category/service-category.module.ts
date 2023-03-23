import { Module } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { ServiceCategoryService } from './service-category.service';
import { ServiceCategoryController } from './service-category.controller';

@Module({
  providers: [PrismaService, ServiceCategoryService],
  exports: [ServiceCategoryService],
  controllers: [ServiceCategoryController],
})
export class ServiceCategoryModule {}
