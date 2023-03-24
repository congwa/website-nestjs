import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu, Prisma } from '@prisma/client';

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
  async create(@Body() data: Prisma.MenuCreateInput): Promise<Menu> {
    return this.menuService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Prisma.MenuUpdateInput,
  ): Promise<Menu> {
    return this.menuService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Menu> {
    return this.menuService.delete(id);
  }
}
