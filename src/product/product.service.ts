import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { Product, Prisma } from '@prisma/client';
import { MenuService } from '../menu/menu.service';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private menuService: MenuService,
  ) {}

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findOne(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.ProductUpdateInput): Promise<Product> {
    return this.prisma.product.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }

  async findAllByCategoryId(id: number): Promise<Product[]> {
    const categoryIds = await this.menuService.getAllIdsByCategoryId(id);
    return this.prisma.product.findMany({
      where: { menu_id: { in: categoryIds } },
    });
  }
}
