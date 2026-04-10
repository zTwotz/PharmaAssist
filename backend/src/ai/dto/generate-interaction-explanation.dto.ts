import { IsString, IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateInteractionExplanationDto {
  @ApiProperty({ description: 'The context of the alert' })
  @IsString()
  @IsNotEmpty()
  alertContext: string;

  @ApiProperty({ description: 'List of medicines involved' })
  @IsArray()
  @IsString({ each: true })
  medicines: string[];

  @ApiProperty({ description: 'List of active ingredients involved' })
  @IsArray()
  @IsString({ each: true })
  activeIngredients: string[];

  @ApiProperty({ description: 'The rule description' })
  @IsString()
  @IsNotEmpty()
  ruleDescription: string;
}
