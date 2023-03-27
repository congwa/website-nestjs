import { IsNotEmpty, IsOptional, IsUrl, MaxLength } from 'class-validator';

/**
model Product {
  id          Int      @id @default(autoincrement())
  name        String
  description String?
  price       Float?
  image       String?
  menuId      Int

  @@map("product")
}
 */

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
  @IsUrl()
  image?: string;

  @IsNotEmpty()
  @MaxLength(10)
  menuId: number;
}
