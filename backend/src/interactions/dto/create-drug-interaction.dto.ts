import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDrugInteractionDto {
  @ApiProperty({ description: 'Mã số của Active Ingredient A' })
  @IsInt()
  @IsNotEmpty()
  activeIngredientAId: number;

  @ApiProperty({ description: 'Mã số của Active Ingredient B' })
  @IsInt()
  @IsNotEmpty()
  activeIngredientBId: number;

  @ApiProperty({ description: 'Mức độ nghiêm trọng (LOW, MEDIUM, HIGH)' })
  @IsString()
  @IsNotEmpty()
  // PAC-TASK-234: Validate severity enum LOW/MEDIUM/HIGH only
  @IsIn(['LOW', 'MEDIUM', 'HIGH'], {
    message: 'Severity must be one of LOW, MEDIUM, HIGH',
  })
  severity: string;

  @ApiPropertyOptional({ description: 'Mô tả tương tác' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Khuyến nghị xử lý' })
  @IsString()
  @IsOptional()
  recommendation?: string;
}
