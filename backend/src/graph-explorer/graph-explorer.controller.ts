import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GraphExplorerService } from './graph-explorer.service';

@Controller('graph-explorer')
@UseGuards(JwtAuthGuard)
export class GraphExplorerController {
  constructor(private readonly graphExplorerService: GraphExplorerService) {}

  @Get('network')
  async getNetwork() {
    return this.graphExplorerService.getNetwork();
  }
}
