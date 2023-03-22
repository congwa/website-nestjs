import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(data: Omit<Product, 'id'>): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findOne(id: number): Promise<Product> {
    const db = await this.prisma.product.findUnique({ where: { id } });
    if(db === null) {
      throw new NotFoundException();
    }
    return db
  }

  async update(id: number, data: Omit<Product, 'id'>): Promise<Product> {
    return this.prisma.product.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }
}
