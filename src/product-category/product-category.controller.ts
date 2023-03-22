import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { ProductCategory } from '@prisma/client';

@Controller('product-category')
export class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  @Get()
  async findAll(): Promise<ProductCategory[]> {
    return this.productCategoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductCategory> {
    return this.productCategoryService.findOne(+id);
  }

  @Post()
  async create(@Body() data: ProductCategory): Promise<ProductCategory> {
    return this.productCategoryService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: ProductCategory): Promise<ProductCategory> {
    return this.productCategoryService.update(+id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ProductCategory> {
    return this.productCategoryService.delete(+id);
  }
}
