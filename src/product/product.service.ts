import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { Product, Prisma } from '@prisma/client';
import { MenuService } from '../menu/menu.service';
import {
  UpdateProjectRequest,
  ProjectsResponsePage,
  ProjectResponse,
} from './models';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private menuService: MenuService,
  ) {}

  async create(data: UpdateProjectRequest): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  async findAll(
    pageSize: number,
    page: number,
    filters: { name?: string; menuId?: number },
  ): Promise<{ list: Product[]; count: number }> {
    const where: Prisma.ProductWhereInput = {};

    if (filters.name) {
      where.name = {
        contains: filters.name,
      };
    }

    if (filters.menuId) {
      where.menuId = filters.menuId;
    }

    const [list, count] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          id: 'desc',
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return { list, count };
  }

  async findOne(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateProjectRequest): Promise<Product> {
    return this.prisma.product.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }

  async findAllByCategoryId(id: number): Promise<Product[]> {
    const categoryIds = await this.menuService.getAllIdsByCategoryId(id);
    return this.prisma.product.findMany({
      where: { menuId: { in: categoryIds } },
    });
  }

  /**
   * 获取某个产品分类下所有产品并进行分页处理
   * @param menuId 产品分类ID
   * @param page 当前页数
   * @param pageSize 每页显示数量
   * @returns Promise<CompaniesResponsePage>
   */
  async findAllProductsByMenuId(
    menuId: number,
    page: number,
    pageSize: number,
  ): Promise<ProjectsResponsePage> {
    const skip = (page - 1) * pageSize;
    const [count, products] = await Promise.all([
      this.prisma.product.count({
        where: { menuId: menuId },
      }),
      this.prisma.product.findMany({
        where: { menuId: menuId },
        skip: skip,
        take: pageSize,
        include: {
          menu: true,
        },
      }),
    ]);
    const projectList: ProjectResponse[] = products.map(
      ({ id, name, subName, description, price, image, menu }) => ({
        id,
        name,
        subName,
        description,
        price,
        image,
        menuId: menu.id,
        menuName: menu.name,
      }),
    );
    return { list: projectList, count };
  }
}
