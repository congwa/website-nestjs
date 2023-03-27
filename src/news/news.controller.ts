import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
// import { PrismaService } from '../common/services/prisma.service';
import { NewsService } from './news.service';
import { News } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async findAll(): Promise<News[]> {
    return this.newsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<News | null> {
    return this.newsService.findOne(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async create(@Body() data: News): Promise<News> {
    return this.newsService.create(data);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async update(@Param('id') id: number, @Body() data: News): Promise<News> {
    return this.newsService.update(id, data);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async delete(@Param('id') id: number): Promise<void> {
    return this.newsService.delete(id);
  }

  @Get('menu/:menuId')
  async findByMenuId(@Param('menuId') menuId: number): Promise<News[]> {
    return this.newsService.findByMenuId(menuId);
  }

  @Get('menu/:menuId')
  async findUsePageByMenuId(
    @Param('menuId') menuId: number,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
  ): Promise<News[]> {
    return this.newsService.findUsePageByMenuId(menuId, { page, pageSize });
  }
}
