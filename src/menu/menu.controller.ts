import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from '@prisma/client';
import { ApiBearerAuth, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdateMenuRequest, MenuResponse } from './models';
import { MenuWhiteFilter } from '@/core/filter/menu-white/menu-white.filter';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  @ApiOkResponse({ type: MenuResponse, isArray: true })
  async findAll(): Promise<Menu[]> {
    return this.menuService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: MenuResponse })
  async findById(@Param('id') id: number): Promise<Menu | null> {
    return this.menuService.findById(id);
  }

  @Get('children/:parentId')
  @ApiOkResponse({ type: MenuResponse, isArray: true })
  async getAllMenuChildren(@Param('parentId') parentId: number) {
    return this.menuService.getAllMenuChildrenFlat(parentId);
  }

  @Get('children/tree/:parentId')
  @ApiOkResponse({ type: MenuResponse, isArray: true })
  async getAllMenuChildrenTree(@Param('parentId') parentId: number) {
    return this.menuService.getAllMenuChildrenTree(parentId);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @UseFilters(new MenuWhiteFilter())
  @ApiOkResponse({ type: MenuResponse })
  async create(@Body() data: UpdateMenuRequest): Promise<Menu> {
    return this.menuService.create(data);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: MenuResponse })
  @UseGuards(AuthGuard())
  @UseFilters(new MenuWhiteFilter())
  async update(
    @Param('id') id: number,
    @Body() data: UpdateMenuRequest,
  ): Promise<Menu> {
    return this.menuService.update(id, data);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: MenuResponse })
  @UseGuards(AuthGuard())
  @UseFilters(new MenuWhiteFilter())
  async delete(@Param('id') id: number): Promise<Menu | null> {
    return this.menuService.delete(id);
  }
}
