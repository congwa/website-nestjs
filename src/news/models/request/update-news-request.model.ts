import { IsNotEmpty, IsOptional, MaxLength, Max } from 'class-validator';

export class UpdateNewsRequest {
  @IsNotEmpty()
  @MaxLength(20)
  title: string;

  @IsNotEmpty()
  content: string;

  @IsOptional()
  @MaxLength(10)
  authorId?: number;

  @IsNotEmpty()
  @Max(10000000)
  menuId: number;
}
