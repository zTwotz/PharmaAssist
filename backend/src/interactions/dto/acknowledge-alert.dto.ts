import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class AcknowledgeAlertDto {
  @ApiPropertyOptional({ description: 'Ghi chú tư vấn cho khách hàng' })
  @IsOptional()
  @IsString()
  note?: string;
}
