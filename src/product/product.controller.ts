import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
// import { PrismaService } from '../common/services/prisma.service';
import { ProductService } from './product.service';
import { Product, Prisma } from '@prisma/client';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() data: Prisma.ProductCreateInput): Promise<Product> {
    return this.productService.create(data);
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product | null> {
    return this.productService.findOne(Number(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.ProductUpdateInput,
  ): Promise<Product> {
    return this.productService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Product> {
    return this.productService.remove(Number(id));
  }

  @Get(':menuId')
  async findAllByMenuId(@Param() params): Promise<Product[]> {
    const menuId = Number(params.menuId);
    const products = await this.productService.findAllByCategoryId(menuId);
    return products;
  }

  @Get(':menuId')
  async findAllProductsByMenuId(
    @Param('menuId') menuId: number,
    @Query('page') page = 1, // 设置默认值为1
    @Query('pageSize') pageSize = 10, // 设置默认值为10
  ): Promise<{ list: Product[]; count: number }> {
    const result = await this.productService.findAllProductsByMenuId(
      menuId,
      page,
      pageSize,
    );
    return result;
  }
}
