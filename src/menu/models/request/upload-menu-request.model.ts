import { IsNotEmpty, IsOptional, IsUrl, Max, MaxLength } from 'class-validator';

export class UpdateMenuRequest {
  @IsNotEmpty({
    message: 'name不能为空'
  })
  @MaxLength(20)
  name: string;

  @IsOptional()
  @IsUrl({
    protocols: ['http', 'https'],
    require_tld: false,
    require_protocol: false,
  },{
    message: '请输入正确的url'
  })
  url?: string;

  @IsOptional()
  @Max(10000, {message: 'Max 10000'})
  parentId?: number;
}
