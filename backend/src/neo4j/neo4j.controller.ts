import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Neo4jQueryDto } from './dto/neo4j-query.dto';

@Controller('neo4j')
export class Neo4jController {
  constructor(private readonly neo4jService: Neo4jService) {}

  @Get('health')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async checkHealth() {
    try {
      const driver = this.neo4jService.getDriver();
      await driver.verifyConnectivity();
      return {
        status: 'ok',
        message: 'Successfully connected to Neo4j AuraDB',
      };
    } catch {
      throw new HttpException(
        {
          status: 'error',
          message: 'Failed to connect to Neo4j AuraDB',
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @Post('query')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN') // Ensure Staff cannot submit raw Cypher
  async executeQuery(@Body() queryDto: Neo4jQueryDto) {
    try {
      const result = await this.neo4jService.read(
        queryDto.cypher,
        queryDto.params || {},
      );
      // Map records to a plain JSON array for the response
      return result.records.map((record) => {
        const obj: Record<string, any> = {};
        record.keys.forEach((k) => {
          const key = k as string;
          obj[key] = record.get(key);
        });
        return obj;
      });
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: error.message || 'Failed to execute Neo4j query',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
