import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateDrugInteractionDto {
  @ApiPropertyOptional({
    description: 'Mức độ nghiêm trọng (LOW, MEDIUM, HIGH)',
  })
  @IsString()
  @IsOptional()
  // PAC-TASK-234: Validate severity enum LOW/MEDIUM/HIGH only
  @IsIn(['LOW', 'MEDIUM', 'HIGH'], {
    message: 'Severity must be one of LOW, MEDIUM, HIGH',
  })
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
