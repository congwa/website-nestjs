import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { News, Prisma } from '@prisma/client';
import { NewsResponse, NewsResponsePage, UpdateNewsRequest } from './models';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    pageSize: number,
    page: number,
    filters: { title?: string; menuId?: number },
  ): Promise<{ list: News[]; count: number }> {
    const where: Prisma.NewsWhereInput = {};

    if (filters.title) {
      where.title = {
        contains: filters.title,
      };
    }

    if (filters.menuId) {
      where.menuId = filters.menuId;
    }

    const [list, count] = await Promise.all([
      this.prisma.news.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          id: 'desc',
        },
      }),
      this.prisma.news.count({ where }),
    ]);

    return { list, count };
  }

  async findOne(id: number): Promise<News | null> {
    return this.prisma.news.findUnique({
      where: { id },
      include: {
        menu: true,
      },
    });
  }

  async create(data: UpdateNewsRequest): Promise<News> {
    return this.prisma.news.create({ data, include: { menu: true } });
  }

  async update(id: number, data: UpdateNewsRequest): Promise<News> {
    return this.prisma.news.update({
      where: { id },
      data,
      include: {
        menu: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.news.delete({
      where: { id },
      include: {
        menu: true,
      },
    });
  }

  async findByMenuId(menuId: number): Promise<NewsResponse[]> {
    const menuList = await this.prisma.news.findMany({
      where: { menuId },
      include: {
        menu: true,
      },
    });
    return menuList.map(
      ({ id, title, content, authorId, createdAt, updatedAt, menu }) => ({
        id,
        title,
        content,
        authorId,
        createdAt,
        updatedAt,
        menuId: menu.id,
        menuName: menu.name,
      }),
    );
  }

  async findUsePageByMenuId(
    menuId: number,
    options: { page: number; pageSize: number },
  ): Promise<NewsResponsePage> {
    const { page, pageSize } = options;
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const [count, newsList] = await Promise.all([
      this.prisma.news.count({
        where: { menuId: menuId },
      }),
      this.prisma.news.findMany({
        where: { menuId: menuId },
        skip: skip,
        take: take,
        include: {
          menu: true,
        },
      }),
    ]);

    const news: NewsResponse[] = newsList.map(
      ({ id, title, content, authorId, createdAt, updatedAt, menu }) => ({
        id,
        title,
        content,
        authorId,
        createdAt,
        updatedAt,
        menuId: menu.id,
        menuName: menu.name,
      }),
    );
    return { list: news, count };
  }
}
