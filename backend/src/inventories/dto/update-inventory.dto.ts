import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateInventoryDto {
  @IsNumber()
  @Min(0)
  quantity: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  minQuantity?: number;
}
