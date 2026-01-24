import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export class MedicineIngredientItemDto {
  @IsInt()
  @IsNotEmpty()
  activeIngredientId: number;

  @IsString()
  @IsNotEmpty()
  strength: string;

  @IsString()
  @IsOptional()
  note?: string;
}

export class UpdateMedicineIngredientsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MedicineIngredientItemDto)
  ingredients: MedicineIngredientItemDto[];
}
