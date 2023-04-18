import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { Menu, Prisma } from '@prisma/client';
import { MenuResponseLevel } from './models';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Menu[]> {
    return this.prisma.menu.findMany();
  }

  async findById(id: number): Promise<Menu | null> {
    const db: Menu | null = await this.prisma.menu.findUnique({
      where: { id },
    });
    return db;
  }

  async getAllMenuChildrenTree(parentId: number): Promise<any> {
    const parentMenu = await this.prisma.menu.findUnique({
      where: { id: parentId },
    });
    const getMenu = async (parentId) => {
      const childMenus = await this.prisma.menu.findMany({
        where: {
          parentId: parentId,
        },
      });
      const childMenusWithChildren = await Promise.all(
        childMenus.map(async (childMenu) => ({
          ...childMenu,
          children: await getMenu(childMenu.id),
        })),
      );
      return childMenusWithChildren;
    };

    return { ...parentMenu, children: getMenu(parentId) };
  }

  async getAllMenuChildrenFlat(parentId: number): Promise<MenuResponseLevel[]> {
    const menuStack: any = [{ id: parentId, level: 0 }];
    const flatMenuList: MenuResponseLevel[] = [];
    while (menuStack.length > 0) {
      const { id, level } = menuStack.pop();
      const menu = await this.prisma.menu.findUnique({ where: { id: id } });
      const flatMenu: MenuResponseLevel = {
        ...menu,
        level: level,
      } as MenuResponseLevel;
      flatMenuList.push(flatMenu);
      const childMenus = await this.prisma.menu.findMany({
        where: {
          parentId: id,
        },
      });
      childMenus.forEach((childMenu) => {
        menuStack.push({ id: childMenu.id, level: level + 1 });
      });
    }
    return flatMenuList;
  }
  async create(data: Prisma.MenuCreateInput): Promise<Menu> {
    return this.prisma.menu.create({ data });
  }

  async update(id: number, data: Prisma.MenuUpdateInput): Promise<Menu> {
    return this.prisma.menu.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Menu | null> {
    const menu = await this.prisma.menu.findUnique({ where: { id } });

    // 如果菜单不存在父菜单，则删除当前菜单及其所有子菜单
    const deleteMenu = async (id: number): Promise<void> => {
      const subMenus = await this.prisma.menu.findMany({
        where: { parentId: id },
      });
      for (const subMenu of subMenus) {
        await deleteMenu(subMenu.id);
      }
      await this.prisma.menu.delete({ where: { id } });
    };

    await deleteMenu(id);

    return menu;
  }

  // 递归方法，获取所有子分类ID
  async getAllIds(ids: number[]): Promise<number[]> {
    const subCategories = await this.prisma.menu.findMany({
      where: { parentId: { in: ids } },
    });

    if (subCategories.length > 0) {
      const subCategoryIds = subCategories.map((category) => category.id);
      const allSubCategoryIds = await this.getAllIds(subCategoryIds);
      return [...subCategoryIds, ...allSubCategoryIds];
    } else {
      return [];
    }
  }

  // 获取一个分类及其所有子分类的ID
  async getAllIdsByCategoryId(id: number): Promise<number[]> {
    const categoryIds = await this.getAllIds([id]);
    categoryIds.push(id);
    return categoryIds;
  }
}
