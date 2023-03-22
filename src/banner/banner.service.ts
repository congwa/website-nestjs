import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { Banner } from '@prisma/client';

@Injectable()
export class BannerService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    title: string;
    imageUrl: string;
    linkUrl: string;
  }): Promise<Banner> {
    return this.prisma.banner.create({ data });
  }

  async findAll(): Promise<Banner[]> {
    return this.prisma.banner.findMany();
  }

  async findOne(id: number): Promise<Banner> {
    const banner = await this.prisma.banner.findUnique({ where: { id } });
    if (banner === null) {
      throw new NotFoundException();
    }
    return banner;
  }

  async update(
    id: number,
    data: { title?: string; imageUrl?: string; linkUrl?: string },
  ): Promise<Banner> {
    return this.prisma.banner.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Banner> {
    return this.prisma.banner.delete({ where: { id } });
  }
}
