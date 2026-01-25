import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  code?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  name?: string;

  @IsInt()
  @IsOptional()
  parentId?: number | null;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsInt()
  @IsOptional()
  sortOrder?: number;

  @IsString()
  @IsOptional()
  status?: string;
}
