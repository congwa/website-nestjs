import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { Company } from '@prisma/client';
import { UpdateCompaniesRequest, DefaultCompanies } from './models';

@Injectable()
export class CompaniesService {
  private prisma = new PrismaClient();

  async getAllCompanies(): Promise<Company[]> {
    return this.prisma.company.findMany();
  }

  async getCompanDetail(): Promise<Company | null> {
    const db = await this.prisma.company.findUnique({ where: { id: 1 } });
    if (db === null) {
      await this.prisma.company.create({ data: DefaultCompanies });
    }
    const newdb = this.prisma.company.findUnique({ where: { id: 1 } });
    if (newdb === null) {
      throw NotFoundException;
    }
    return newdb;
  }

  async getCompanyById(id: number): Promise<Company> {
    const db = await this.prisma.company.findUnique({ where: { id } });
    if (db === null) {
      throw NotFoundException;
    }
    return db;
  }

  async createCompany(data: UpdateCompaniesRequest): Promise<Company> {
    return this.prisma.company.create({ data });
  }

  async updateCompany(
    id: number,
    data: UpdateCompaniesRequest,
  ): Promise<Company> {
    return this.prisma.company.update({ where: { id }, data });
  }

  async deleteCompany(id: number): Promise<Company> {
    return this.prisma.company.delete({ where: { id } });
  }
}
