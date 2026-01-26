import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateStockImportDto {
  @IsInt()
  supplierId: number;

  @IsInt()
  warehouseId: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
