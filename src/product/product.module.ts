import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from '../common/services/prisma.service';
import { MenuService } from '../menu/menu.service';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService, PrismaService, MenuService],
})
export class ProductModule {}
