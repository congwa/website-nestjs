import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
// import { PrismaService } from '../common/services/prisma.service';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProjectRequest } from './models';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  create(@Body() data: UpdateProjectRequest): Promise<Product> {
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  update(
    @Param('id') id: string,
    @Body() data: UpdateProjectRequest,
  ): Promise<Product> {
    return this.productService.update(Number(id), data);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
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
