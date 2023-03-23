import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ServiceCategoryService } from './service-category.service';
import { ServiceCategory } from '@prisma/client';

@Controller('service-category')
export class ServiceCategoryController {
  constructor(private readonly serviceCategoryService: ServiceCategoryService) {}

  @Get()
  async findAll(): Promise<ServiceCategory[]> {
    return this.serviceCategoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ServiceCategory> {
    return this.serviceCategoryService.findOne(+id);
  }

  @Post()
  async create(@Body() data: ServiceCategory): Promise<ServiceCategory> {
    return this.serviceCategoryService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: ServiceCategory): Promise<ServiceCategory> {
    return this.serviceCategoryService.update(+id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ServiceCategory> {
    return this.serviceCategoryService.delete(+id);
  }
}
