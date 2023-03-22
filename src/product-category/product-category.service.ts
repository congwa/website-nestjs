import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { ProductCategory } from '@prisma/client';

@Injectable()
export class ProductCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ProductCategory[]> {
    return this.prisma.productCategory.findMany();
  }

  async findOne(id: number): Promise<ProductCategory> {
    const db = await this.prisma.productCategory.findUnique({
      where: { id },
      include: { parent: true, children: true, products: true },
    });
    if(db === null) {
      throw new NotFoundException();
    }
    return db;
  }

  async create(data: ProductCategory): Promise<ProductCategory> {
    return this.prisma.productCategory.create({
      data,
    });
  }

  async update(id: number, data: ProductCategory): Promise<ProductCategory> {
    return this.prisma.productCategory.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<ProductCategory> {
    return this.prisma.productCategory.delete({
      where: { id },
    });
  }
}
