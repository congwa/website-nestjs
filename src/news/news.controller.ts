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
import { NewsService } from './news.service';
import { News } from '@prisma/client';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdateNewsRequest, NewsResponse, NewsResponsePage } from './models';
import { MenuResponsePipe } from '@/core/pipes/menu-response-pipe';
import { OptionalParseIntPipe } from '@/core/pipes/optional-parse-int-pipe';

// ApiOkResponse有坑，使用了ApiOkResponse，那么usePipes处理返回值会有问题
@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiQuery({
    name: 'title',
    required: false,
    description: '新闻标题',
  })
  @ApiQuery({
    name: 'menuId',
    required: false,
    description: '菜单 ID',
  })
  @ApiQuery({
    name: 'pageSize',
    type: Number,
    required: false,
    description: '每页记录数，默认为 10',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: '当前页码，默认为 1',
  })
  @ApiOkResponse({ type: NewsResponse, isArray: true })
  async findAll(
    @Query('pageSize', new OptionalParseIntPipe()) pageSize = 10,
    @Query('page', new OptionalParseIntPipe()) page = 1,
    @Query('title') title?: string,
    @Query('menuId', new OptionalParseIntPipe())
    menuId: number | undefined = undefined,
  ): Promise<News[]> {
    const news = await this.newsService.findAll(pageSize, page, {
      title,
      menuId,
    });
    return new MenuResponsePipe().transform(news);
  }

  @Get(':id')
  @ApiOkResponse({ type: NewsResponse })
  async findOne(@Param('id') id: number): Promise<News | null> {
    const news = this.newsService.findOne(id);
    return new MenuResponsePipe().transform(news);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOkResponse({ type: NewsResponse })
  @UseGuards(AuthGuard())
  async create(@Body() data: UpdateNewsRequest): Promise<News> {
    const news = await this.newsService.create(data);
    return new MenuResponsePipe().transform(news);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: NewsResponse })
  @UseGuards(AuthGuard())
  async update(
    @Param('id') id: number,
    @Body() data: UpdateNewsRequest,
  ): Promise<News> {
    const news = await this.newsService.update(id, data);
    return new MenuResponsePipe().transform(news);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: NewsResponse })
  @UseGuards(AuthGuard())
  async delete(@Param('id') id: number): Promise<void> {
    const news = await this.newsService.delete(id);
    return new MenuResponsePipe().transform(news);
  }

  @Get('menu/:menuId')
  @ApiOkResponse({ type: NewsResponse, isArray: true })
  async findByMenuId(@Param('menuId') menuId: number): Promise<NewsResponse[]> {
    const newsList = await this.newsService.findByMenuId(menuId);
    return new MenuResponsePipe().transform(newsList);
  }

  @Get('menu/:menuId')
  @ApiOkResponse({ type: NewsResponse, isArray: true })
  async findUsePageByMenuId(
    @Param('menuId') menuId: number,
    @Query('page', new OptionalParseIntPipe()) page = 1,
    @Query('pageSize', new OptionalParseIntPipe()) pageSize = 10,
  ): Promise<NewsResponsePage> {
    return this.newsService.findUsePageByMenuId(menuId, { page, pageSize });
  }
}
