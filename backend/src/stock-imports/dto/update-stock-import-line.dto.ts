import {
  IsInt,
  IsNumber,
  IsString,
  Min,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class UpdateStockImportLineDto {
  @IsOptional()
  @IsString()
  batchNumber?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  importPrice?: number;

  @IsOptional()
  @IsDateString()
  expiryDate?: string;
}
