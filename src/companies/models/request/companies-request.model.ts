import { IsOptional, MaxLength, IsEmail } from 'class-validator';

export class UpdateCompaniesRequest {

  @IsOptional()
  @MaxLength(20)
  name: string;

  @IsOptional()
  @MaxLength(50)
  address?: string;

  @IsOptional()
  @MaxLength(50)
  city?: string;

  @IsOptional()
  @MaxLength(50)
  state?: string;

  @IsOptional()
  @MaxLength(50)
  zip?: string;

  @IsOptional()
  @MaxLength(51)
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
