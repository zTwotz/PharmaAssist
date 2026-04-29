import {
  IsOptional,
  IsString,
  IsDateString,
  IsInt,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class RevenueReportQueryDto {
  @ApiProperty({ required: false, description: 'Start date in ISO format' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ required: false, description: 'End date in ISO format' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({ required: false, description: 'Order status to filter by' })
  @IsOptional()
  @IsString()
  status?: string;
}

export class TopMedicinesQueryDto extends RevenueReportQueryDto {
  @ApiProperty({
    required: false,
    description: 'Number of top medicines to return',
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}

export class InventoryReportQueryDto {
  @ApiProperty({ required: false, description: 'Filter by warehouse ID' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  warehouseId?: number;

  @ApiProperty({ required: false, description: 'Include only low-stock items' })
  @IsOptional()
  @IsString()
  stockStatus?: 'low' | 'normal' | 'all';
}
