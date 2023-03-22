import { Module } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryController } from './product-category.controller';

@Module({
  providers: [PrismaService, ProductCategoryService],
  exports: [ProductCategoryService],
  controllers: [ProductCategoryController],
})
export class ProductCategoryModule {}
