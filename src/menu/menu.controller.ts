import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu, Prisma } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async findAll(): Promise<Menu[]> {
    return this.menuService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Menu | null> {
    return this.menuService.findById(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async create(@Body() data: Prisma.MenuCreateInput): Promise<Menu> {
    return this.menuService.create(data);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async update(
    @Param('id') id: number,
    @Body() data: Prisma.MenuUpdateInput,
  ): Promise<Menu> {
    return this.menuService.update(id, data);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async delete(@Param('id') id: number): Promise<Menu> {
    return this.menuService.delete(id);
  }
}
