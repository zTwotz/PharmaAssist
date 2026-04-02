import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { GenerateInteractionExplanationDto } from './dto/generate-interaction-explanation.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { RequirePermissions } from '../auth/permissions.decorator';

@ApiTags('ai')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('interaction-explanation')
  @Roles('Admin', 'Staff')
  @RequirePermissions('USE_AI_COPILOT')
  @ApiOperation({ summary: 'Generate AI explanation for interaction alert' })
  async generateInteractionExplanation(
    @Req() req: any,
    @Body() dto: GenerateInteractionExplanationDto,
  ) {
    const userId = req.user.id;
    return this.aiService.generateInteractionExplanation({
      userId,
      ...dto,
    });
  }
}
