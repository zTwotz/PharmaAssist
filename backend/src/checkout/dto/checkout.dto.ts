import { Type } from 'class-transformer';
import { 
  IsEnum, 
  IsInt, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  Min, 
  ValidateNested,
  ValidateIf
} from 'class-validator';

export enum PaymentMethod {
  CASH = 'CASH',
  BANK_TRANSFER_SIMULATION = 'BANK_TRANSFER_SIMULATION',
}

export class PaymentDto {
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  method: PaymentMethod;

  @ValidateIf(o => o.method === PaymentMethod.CASH)
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  amountTendered?: number;

  @ValidateIf(o => o.method === PaymentMethod.BANK_TRANSFER_SIMULATION)
  @IsString()
  @IsNotEmpty()
  transactionReference?: string;
}

export class CheckoutDto {
  @IsInt()
  @IsNotEmpty()
  orderId: number;

  @ValidateNested()
  @Type(() => PaymentDto)
  @IsNotEmpty()
  payment: PaymentDto;
}
