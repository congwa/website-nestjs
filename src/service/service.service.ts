import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { Service } from '@prisma/client';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  async create(data: Omit<Service, 'id'>): Promise<Service> {
    return this.prisma.service.create({ data });
  }

  async findAll(): Promise<Service[]> {
    return this.prisma.service.findMany();
  }

  async findOne(id: number): Promise<Service> {
    const db = await this.prisma.service.findUnique({ where: { id } });
    if(db === null) {
      throw new NotFoundException();
    }
    return db
  }

  async update(id: number, data: Omit<Service, 'id'>): Promise<Service> {
    return this.prisma.service.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Service> {
    return this.prisma.service.delete({ where: { id } });
  }
}
