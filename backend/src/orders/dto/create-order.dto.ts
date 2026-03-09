import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
  ArrayMinSize,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDetailDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  productVariantId: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 50000 })
  @IsNumber()
  @Min(0)
  unitPrice: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: 'OFFLINE', description: 'Loại đơn hàng' })
  @IsString()
  orderType: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  storeId: number;

  @ApiProperty({ type: [CreateOrderDetailDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDetailDto)
  details: CreateOrderDetailDto[];
}
