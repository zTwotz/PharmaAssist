import { IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderItemDto {
  @ApiProperty({ description: 'Số lượng cập nhật' })
  @IsInt()
  @IsPositive()
  quantity: number;
}
