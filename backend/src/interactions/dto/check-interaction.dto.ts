import { IsArray, IsInt, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckInteractionDto {
  @ApiProperty({
    description: 'Danh sách ID của thuốc (Medicine ID) cần kiểm tra tương tác',
    example: [1, 2, 5],
    type: [Number],
  })
  @IsArray()
  @IsInt({ each: true })
  @ArrayMinSize(2, {
    message: 'Cần ít nhất 2 loại thuốc để kiểm tra tương tác',
  })
  medicineIds: number[];
}
