import { IsNotEmpty, IsString, IsOptional, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Neo4jQueryDto {
  @ApiProperty({
    description: 'Raw Cypher query string',
    example: 'MATCH (n) RETURN n LIMIT 10',
  })
  @IsString()
  @IsNotEmpty()
  cypher: string;

  @ApiPropertyOptional({
    description: 'Optional parameters for the query',
    example: { slug: 'paracetamol' },
  })
  @IsObject()
  @IsOptional()
  params?: Record<string, any>;
}
