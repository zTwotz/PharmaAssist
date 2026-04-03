import { IsOptional, IsString, IsInt, Min, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAiAuditLogsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 20;

  @IsOptional()
  @IsString()
  providerUsed?: string;

  @IsOptional()
  @IsString()
  guardrailStatus?: string;

  @IsOptional()
  @IsString()
  promptType?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
