import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../common/services/prisma.service';
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [CompaniesController],
  providers: [CompaniesService, PrismaService],
})
export class CompaniesModule {}
