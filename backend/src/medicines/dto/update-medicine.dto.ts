import { IsBoolean, IsInt, IsOptional, IsString, MaxLength, IsNumber, Min } from 'class-validator';

export class UpdateMedicineDto {
  // Product info
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
  categoryId?: number;

  @IsInt()
  @IsOptional()
  brandId?: number;

  @IsInt()
  @IsOptional()
  manufacturerId?: number;

  @IsString()
  @IsOptional()
  shortDescription?: string;

  @IsString()
  @IsOptional()
  description?: string;

  // Medicine info
  @IsString()
  @IsOptional()
  @MaxLength(100)
  medicineCode?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  registrationNumber?: string;

  @IsInt()
  @IsOptional()
  dosageFormId?: number;

  @IsInt()
  @IsOptional()
  medicineUnitId?: number;

  @IsBoolean()
  @IsOptional()
  requiresPrescription?: boolean;

  @IsString()
  @IsOptional()
  usageNote?: string;

  @IsString()
  @IsOptional()
  storageInstruction?: string;

  @IsInt()
  @IsOptional()
  shelfLifeMonths?: number;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  sellingPrice?: number;
}
