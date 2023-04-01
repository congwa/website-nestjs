import { IsNotEmpty, IsOptional, IsUrl, MaxLength } from 'class-validator';

/**
 * model Banner {
  id        Int     @id @default(autoincrement())
  title     String
  imageUrl  String
  linkUrl   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("banner")
}
 * 
 * 
 */

export class UpdateBannerRequest {
  @IsNotEmpty()
  @MaxLength(20)
  title: string;

  @IsNotEmpty()
  @IsUrl({
    protocols: ['http', 'https'],
    require_tld: false,
    require_protocol: false,
  },{
    message: '请输入正确的url'
  })
  imageUrl: string;

  @IsOptional()
  @IsUrl({
    protocols: ['http', 'https'],
    require_tld: false,
    require_protocol: false,
  },{
    message: '请输入正确的url'
  })
  linkUrl?: string;
}
