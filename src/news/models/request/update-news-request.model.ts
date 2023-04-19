import { IsNotEmpty, IsOptional, MaxLength, Max, IsUrl } from 'class-validator';

export class UpdateNewsRequest {
  @IsNotEmpty()
  @MaxLength(20)
  title: string;

  @IsOptional()
  @MaxLength(500)
  subTitle: string;

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
  image: string;

  @IsNotEmpty()
  content: string;

  @IsOptional()
  @MaxLength(10)
  authorId?: number;

  @IsNotEmpty()
  @Max(10000000)
  menuId: number;
}
