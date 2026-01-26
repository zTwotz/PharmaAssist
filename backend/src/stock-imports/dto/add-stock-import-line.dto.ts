import { IsInt, IsNotEmpty, IsNumber, IsString, Min, IsDateString } from 'class-validator';

export class AddStockImportLineDto {
  @IsInt()
  @IsNotEmpty()
  medicineId: number;

  @IsString()
  @IsNotEmpty()
  batchNumber: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  importPrice: number;

  @IsDateString()
  @IsNotEmpty()
  expiryDate: string;
}
