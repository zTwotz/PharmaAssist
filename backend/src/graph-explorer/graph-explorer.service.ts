import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Neo4jService } from '../neo4j/neo4j.service';

@Injectable()
export class GraphExplorerService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async getNetwork() {
    try {
      const cypher = `
        MATCH (n)
        OPTIONAL MATCH (n)-[r]->(m)
        RETURN n, r, m
        LIMIT 500
      `;
      const result = await this.neo4jService.read(cypher);

      const nodesMap = new Map<string, any>();
      const linksSet = new Set<string>();
      const links: any[] = [];

      result.records.forEach((record) => {
        const n = record.get('n');
        if (n && !nodesMap.has(n.elementId)) {
          nodesMap.set(n.elementId, {
            id: n.elementId,
            labels: n.labels,
            properties: n.properties,
          });
        }

        const m = record.get('m');
        if (m && !nodesMap.has(m.elementId)) {
          nodesMap.set(m.elementId, {
            id: m.elementId,
            labels: m.labels,
            properties: m.properties,
          });
        }

        const r = record.get('r');
        if (r && !linksSet.has(r.elementId)) {
          linksSet.add(r.elementId);
          links.push({
            id: r.elementId,
            source: r.startNodeElementId,
            target: r.endNodeElementId,
            type: r.type,
            properties: r.properties,
          });
        }
      });

      return {
        nodes: Array.from(nodesMap.values()),
        links,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: error.message || 'Failed to fetch graph network',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
