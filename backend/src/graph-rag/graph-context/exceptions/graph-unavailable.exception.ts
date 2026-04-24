import { ServiceUnavailableException } from '@nestjs/common';

export class GraphUnavailableException extends ServiceUnavailableException {
  constructor(reason?: string) {
    super(
      `The knowledge graph is currently unavailable or stale. Please try again later. ${
        reason ? `(Reason: ${reason})` : ''
      }`,
    );
  }
}
