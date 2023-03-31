import { IsNotEmpty, IsOptional, MaxLength, IsEmail } from 'class-validator';

export class UpdateCompaniesRequest {
  @MaxLength(20)
  name: string;

  @IsOptional()
  @MaxLength(50)
  address?: string;

  @IsOptional()
  @MaxLength(50)
  city?: string;

  @IsOptional()
  state?: string;

  @IsOptional()
  zip?: string;

  @IsOptional()
  @MaxLength(11)
  phone?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(20)
  email?: string;

  @IsOptional()
  description?: string;
}

export const DetaultCompanies = {
  name: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  phone: '',
  email: '',
  description: '',
}
