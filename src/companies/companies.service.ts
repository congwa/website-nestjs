import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { Company } from '@prisma/client';
import { UpdateCompaniesRequest, DetaultCompanies } from './models';

@Injectable()
export class CompaniesService {
  private prisma = new PrismaClient();

  async getAllCompanies(): Promise<Company[]> {
    return this.prisma.company.findMany();
  }

  async getCompanDetail(): Promise<Company | null> {
    let db = await this.prisma.company.findUnique({ where: { id: 1 } });
    if (db === null) {
      await this.prisma.company.create({ data: DetaultCompanies })
    }
    let newdb = this.prisma.company.findUnique({ where: { id: 1 } });
    if (newdb === null) {
      throw NotFoundException;
    }
    return newdb;
  }

  async getCompanyById(id: number): Promise<Company> {
    let db = await this.prisma.company.findUnique({ where: { id } });
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
    console.log(data, '-----')
    return this.prisma.company.update({ where: { id }, data });
  }

  async deleteCompany(id: number): Promise<Company> {
    return this.prisma.company.delete({ where: { id } });
  }
}
