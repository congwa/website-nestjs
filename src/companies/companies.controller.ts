import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Company } from '@prisma/client';
import { CompaniesService } from './companies.service';
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}
  @Get()
  async getAllCompanies(): Promise<Company[]> {
    return this.companiesService.getAllCompanies();
  }
  @Get(':id')
  async getCompanyById(@Param('id') id: number): Promise<Company> {
    return this.companiesService.getCompanyById(id);
  }
  @Post()
  async createCompany(@Body() data: Company): Promise<Company> {
    return this.companiesService.createCompany(data);
  }
  @Put(':id')
  async updateCompany(@Param('id') id: number, @Body() data: Company): Promise<Company> {
    return this.companiesService.updateCompany(id, data);
  }
  @Delete(':id')
  async deleteCompany(@Param('id') id: number): Promise<Company> {
    return this.companiesService.deleteCompany(id);
  }
}