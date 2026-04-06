import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import neo4j, { Driver, Session, Result } from 'neo4j-driver';

@Injectable()
export class Neo4jService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly logger = new Logger(Neo4jService.name);
  private driver: Driver;

  constructor(private readonly configService: ConfigService) {}

  async onApplicationBootstrap() {
    const uri = this.configService.get<string>('NEO4J_URI');
    const username = this.configService.get<string>('NEO4J_USERNAME');
    const password = this.configService.get<string>('NEO4J_PASSWORD');

    if (!uri || !username || !password) {
      this.logger.warn(
        'Neo4j credentials not fully provided in environment variables. Graph Sync will fail if attempted.',
      );
      return;
    }

    try {
      this.driver = neo4j.driver(
        uri,
        neo4j.auth.basic(username, password),
        {
          maxConnectionPoolSize: 50,
          connectionTimeout: 30000,
        },
      );
      
      // Verify connectivity on startup
      await this.driver.verifyConnectivity();
      this.logger.log('Successfully connected to Neo4j AuraDB');
    } catch (error) {
      this.logger.error('Failed to connect to Neo4j AuraDB', error);
      // We don't throw here to avoid crashing the whole app if Neo4j is down,
      // as Neo4j is only a projection and PostgreSQL is the source of truth.
    }
  }

  async onApplicationShutdown() {
    if (this.driver) {
      this.logger.log('Closing Neo4j driver connection...');
      await this.driver.close();
      this.logger.log('Neo4j driver connection closed.');
    }
  }

  getDriver(): Driver {
    if (!this.driver) {
      throw new Error('Neo4j Driver is not initialized.');
    }
    return this.driver;
  }

  /**
   * Helper to execute a read query
   */
  async read(cypher: string, params?: Record<string, any>): Promise<Result> {
    const session: Session = this.getDriver().session({
      defaultAccessMode: neo4j.session.READ,
    });
    try {
      return await session.run(cypher, params);
    } finally {
      await session.close();
    }
  }

  /**
   * Helper to execute a write query
   */
  async write(cypher: string, params?: Record<string, any>): Promise<Result> {
    const session: Session = this.getDriver().session({
      defaultAccessMode: neo4j.session.WRITE,
    });
    try {
      return await session.run(cypher, params);
    } finally {
      await session.close();
    }
  }
}
