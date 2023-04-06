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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
// import { PrismaService } from '../common/services/prisma.service';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import { ApiBearerAuth, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProjectResponse, UpdateProjectRequest } from './models';
import { MenuResponsePipe } from '@/core/pipes/menu-response-pipe';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ProjectResponse })
  @UseGuards(AuthGuard())
  async create(@Body() data: UpdateProjectRequest): Promise<Product> {
    const product = await this.productService.create(data);
    return new MenuResponsePipe().transform(product);
  }

  @Get()
  @ApiOkResponse({ type: ProjectResponse, isArray: true })
  async findAll(): Promise<Product[]> {
    const projects = await this.productService.findAll();
    return new MenuResponsePipe().transform(projects);
  }

  @Get(':id')
  @ApiOkResponse({ type: ProjectResponse })
  async findOne(@Param('id') id: string): Promise<Product | null> {
    const project = await this.productService.findOne(Number(id));
    return new MenuResponsePipe().transform(project);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async update(
    @Param('id') id: string,
    @Body() data: UpdateProjectRequest,
  ): Promise<Product> {
    const project = await this.productService.update(Number(id), data);
    return new MenuResponsePipe().transform(project);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: ProjectResponse, isArray: true })
  @UseGuards(AuthGuard())
  async remove(@Param('id') id: string): Promise<Product> {
    const project = await this.productService.remove(Number(id));
    return new MenuResponsePipe().transform(project);
  }

  @Get('menuAll/:menuId')
  @ApiOkResponse({ type: ProjectResponse, isArray: true })
  async findAllByMenuId(@Param() params): Promise<Product[]> {
    const menuId = Number(params.menuId);
    const products = await this.productService.findAllByCategoryId(menuId);
    return new MenuResponsePipe().transform(products);
  }

  @Get('menuPage/:menuId')
  @ApiOkResponse({ type: ProjectResponse, isArray: true })
  async findAllProductsByMenuId(
    @Param('menuId') menuId: number,
    @Query('page') page = 1, // 设置默认值为1
    @Query('pageSize') pageSize = 10, // 设置默认值为10
  ): Promise<{ list: ProjectResponse[]; count: number }> {
    const result = await this.productService.findAllProductsByMenuId(
      menuId,
      page,
      pageSize,
    );
    return result;
  }
}
