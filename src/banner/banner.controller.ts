import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import type { Banner } from '@prisma/client';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post()
  create(
    @Body() data: { title: string; imageUrl: string; linkUrl: string },
  ): Promise<Banner> {
    return this.bannerService.create(data);
  }

  @Get()
  findAll(): Promise<Banner[]> {
    return this.bannerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Banner> {
    return this.bannerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: { title?: string; imageUrl?: string; linkUrl?: string },
  ): Promise<Banner> {
    return this.bannerService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Banner> {
    return this.bannerService.remove(+id);
  }
}
