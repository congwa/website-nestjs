import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { Company } from '@prisma/client';
import { CompaniesService } from './companies.service';
import { ApiBearerAuth, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdateCompaniesRequest, CompaniesResponse } from './models';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  @ApiOkResponse({ type: CompaniesResponse })
  async getCompanDetail(): Promise<Company | null> {
    return this.companiesService.getCompanDetail();
  }

  @Get(':id')
  @ApiOkResponse({ type: CompaniesResponse })
  async getCompanyById(@Param('id') id: number): Promise<Company> {
    return this.companiesService.getCompanyById(id);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOkResponse({ type: CompaniesResponse })
  @UseGuards(AuthGuard())
  async createCompany(
    @Body() data: UpdateCompaniesRequest,
  ): Promise<CompaniesResponse> {
    return this.companiesService.createCompany(data);
  }

 
  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: CompaniesResponse })
  async updateCompany(
    @Param('id') id: number,
    @Body() data: UpdateCompaniesRequest,
  ): Promise<Company> {
    console.log(data, '-------------------------------');
    return this.companiesService.updateCompany(id, data);
  }

}
