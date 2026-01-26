import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateInventoryDto {
  @IsNumber()
  @Min(0)
  minQuantity: number;
}
