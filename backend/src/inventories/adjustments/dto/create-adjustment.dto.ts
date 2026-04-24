import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export enum AdjustmentType {
  SET = 'SET',
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
}

export class CreateAdjustmentLineDto {
  @IsInt()
  @IsNotEmpty()
  medicineId: number;

  @IsInt()
  @IsNotEmpty()
  medicineBatchId: number;

  @IsInt()
  @Min(0)
  expectedQuantity: number;

  @IsInt()
  @Min(0)
  actualQuantity: number;

  @IsEnum(AdjustmentType)
  adjustmentType: AdjustmentType;
}

export class CreateAdjustmentDto {
  @IsInt()
  @IsNotEmpty()
  storeId: number;

  // PAC-377: Enforce required adjustment reason in backend
  @IsString()
  @IsNotEmpty({ message: 'Lý do kiểm kho là bắt buộc' })
  reason: string;

  @IsOptional()
  @IsString()
  note?: string;

  @ValidateNested({ each: true })
  @Type(() => CreateAdjustmentLineDto)
  @IsOptional()
  lines?: CreateAdjustmentLineDto[];
}
