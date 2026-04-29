import { Injectable, Logger } from '@nestjs/common';
import { GraphFreshnessService } from '../../graph-sync/graph-freshness/graph-freshness.service';

export interface RAGContextResult {
  context: string;
  graphUsed: boolean;
  warnings?: string[];
}

@Injectable()
export class GraphRagFallbackService {
  private readonly logger = new Logger(GraphRagFallbackService.name);

  constructor(private readonly freshnessService: GraphFreshnessService) {}

  /**
   * Retrieves context for RAG. Attempts to use Neo4j Graph.
   * If Neo4j is unavailable or stale, falls back to PostgreSQL relational queries.
   */
  async getContextForQuery(
    query: string,
    neo4jAvailable: boolean,
  ): Promise<RAGContextResult> {
    const warnings: string[] = [];

    // Check availability
    if (!neo4jAvailable) {
      this.logger.warn('Neo4j is unavailable, falling back to PostgreSQL');
      warnings.push(
        'Graph database is unavailable. Using relational fallback. Results may lack deep relationship insights.',
      );
      return this.getPostgresContext(query, warnings);
    }

    // Check freshness
    const freshness = await this.freshnessService.evaluateFreshness();
    if (!freshness.isFresh) {
      this.logger.warn(
        `Graph is stale (${freshness.reason}), falling back to PostgreSQL`,
      );
      warnings.push(
        `Graph data is stale: ${freshness.reason}. Using relational fallback to ensure accuracy.`,
      );
      return this.getPostgresContext(query, warnings);
    }

    // Try Graph (Mocked success)
    try {
      const graphContext = await this.getNeo4jContext(query);
      return {
        context: graphContext,
        graphUsed: true,
        warnings: warnings.length > 0 ? warnings : undefined,
      };
    } catch (error) {
      this.logger.error('Neo4j query failed', error);
      warnings.push('Error querying graph. Using relational fallback.');
      return this.getPostgresContext(query, warnings);
    }
  }

  private getNeo4jContext(query: string): Promise<string> {
    // Mock Neo4j Context Generation
    return Promise.resolve(`[Graph Context] Found relationships for: ${query}`);
  }

  private getPostgresContext(
    query: string,
    warnings: string[],
  ): Promise<RAGContextResult> {
    // Mock PostgreSQL Context Generation
    const pgContext = `[Relational Context] Found records for: ${query}`;
    return Promise.resolve({
      context: pgContext,
      graphUsed: false,
      warnings,
    });
  }
}
