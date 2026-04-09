import {
  Controller,
  Get,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

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
}
