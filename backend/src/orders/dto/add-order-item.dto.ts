import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddOrderItemDto {
  @ApiProperty({ description: 'ID của sản phẩm (variant)' })
  @IsInt()
  @IsNotEmpty()
  productVariantId: number;

  @ApiProperty({ description: 'Số lượng' })
  @IsInt()
  @IsPositive()
  quantity: number;
}
