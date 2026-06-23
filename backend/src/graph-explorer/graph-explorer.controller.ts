import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';

import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GraphExplorerService } from './graph-explorer.service';
import { GraphFreshnessService } from '../graph-sync/graph-freshness.service';

@Controller('graph-explorer')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'STAFF')
export class GraphExplorerController {
  constructor(
    private readonly graphExplorerService: GraphExplorerService,
    private readonly graphFreshnessService: GraphFreshnessService,
  ) {}

  @Get('freshness')
  async getFreshness() {
    return this.graphFreshnessService.checkFreshness();
  }

  @Get('network')
  async getNetwork() {
    return this.graphExplorerService.getNetwork();
  }
}
