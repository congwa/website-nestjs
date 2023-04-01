import { IsNotEmpty, IsOptional, IsUrl, MaxLength } from 'class-validator';

export class UpdateMenuRequest {
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsUrl({
    protocols: ['http', 'https'],
    require_tld: false,
    require_protocol: false,
  },{
    message: '请输入正确的url'
  })
  url?: string;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(10)
  parentId?: number;
}
