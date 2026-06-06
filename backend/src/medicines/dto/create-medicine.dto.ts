import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateMedicineDto {
  // Product info
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  code: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsInt()
  @IsNotEmpty()
  categoryId: number;

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
  @IsNotEmpty()
  @MaxLength(100)
  medicineCode: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  registrationNumber?: string;

  @IsInt()
  @IsNotEmpty()
  dosageFormId: number;

  @IsInt()
  @IsNotEmpty()
  medicineUnitId: number;

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
}
