import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateDrugInteractionDto {
  @ApiPropertyOptional({ description: 'Mức độ nghiêm trọng (LOW, MEDIUM, HIGH)' })
  @IsString()
  @IsOptional()
  @IsIn(['LOW', 'MEDIUM', 'HIGH'], { message: 'Severity must be one of LOW, MEDIUM, HIGH' })
  severity?: string;

  @ApiPropertyOptional({ description: 'Mô tả tương tác' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Khuyến nghị xử lý' })
  @IsString()
  @IsOptional()
  recommendation?: string;
}
