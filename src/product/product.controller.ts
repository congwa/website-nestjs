import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(Number(id));
  }

  @Post()
  async create(@Body() data: Omit<Product, 'id'>): Promise<Product> {
    return this.productService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Omit<Product, 'id'>): Promise<Product> {
    return this.productService.update(Number(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Product> {
    return this.productService.delete(Number(id));
  }
}
