import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { ServiceCategory } from '@prisma/client';

@Injectable()
export class ServiceCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ServiceCategory[]> {
    return this.prisma.serviceCategory.findMany();
  }

  async findOne(id: number): Promise<ServiceCategory> {
    const db = await this.prisma.serviceCategory.findUnique({
      where: { id },
      include: { parent: true, children: true, services: true },
    });
    if(db === null) {
      throw new NotFoundException();
    }
    return db;
  }

  async create(data: ServiceCategory): Promise<ServiceCategory> {
    return this.prisma.serviceCategory.create({
      data,
    });
  }

  async update(id: number, data: ServiceCategory): Promise<ServiceCategory> {
    return this.prisma.serviceCategory.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<ServiceCategory> {
    return this.prisma.serviceCategory.delete({
      where: { id },
    });
  }
}
