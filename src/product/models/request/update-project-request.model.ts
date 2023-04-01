import { IsNotEmpty, IsOptional, IsUrl, MaxLength } from 'class-validator';

export class UpdateProjectRequest {
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @MaxLength(10)
  price?: number;

  @IsOptional()
  @IsUrl({
    protocols: ['http', 'https'],
    require_tld: false,
    require_protocol: false,
  },{
    message: '请输入正确的url'
  })
  image?: string;

  @IsNotEmpty()
  @MaxLength(10)
  menuId: number;
}
