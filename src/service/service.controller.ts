import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ServiceService } from './service.service';
import { Service } from '@prisma/client';

@Controller('service')
export class ServiceController {
  constructor(private serviceService: ServiceService) {}

  @Get()
  async findAll(): Promise<Service[]> {
    return this.serviceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Service> {
    return this.serviceService.findOne(Number(id));
  }

  @Post()
  async create(@Body() data: Omit<Service, 'id'>): Promise<Service> {
    return this.serviceService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Omit<Service, 'id'>): Promise<Service> {
    return this.serviceService.update(Number(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Service> {
    return this.serviceService.delete(Number(id));
  }
}
