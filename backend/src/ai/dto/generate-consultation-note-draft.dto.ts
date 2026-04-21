import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateConsultationNoteDraftDto {
  @ApiProperty({ description: 'The context of the alert' })
  @IsString()
  @IsNotEmpty()
  alertContext: string;

  @ApiProperty({ description: 'The context of the order or medications' })
  @IsString()
  @IsNotEmpty()
  orderContext: string;
}
