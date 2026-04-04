import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class GenerateFollowUpQuestionsDto {
  @ApiProperty({ description: 'Short context or symptoms entered by staff' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  shortContext: string;
}
