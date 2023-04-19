import { IsNotEmpty, IsOptional, IsUrl, MaxLength, Max } from 'class-validator';

export class UpdateProjectRequest {
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @IsOptional()
  @MaxLength(500)
  subName: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  @MaxLength(10)
  price?: number;

  @IsOptional()
  @IsUrl(
    {
      protocols: ['http', 'https'],
      require_tld: false,
      require_protocol: false,
    },
    {
      message: '请输入正确的url',
    },
  )
  image?: string;

  @IsNotEmpty()
  @Max(1000000)
  menuId: number;
}
