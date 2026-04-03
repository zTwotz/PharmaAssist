import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { GenerateInteractionExplanationDto } from './dto/generate-interaction-explanation.dto';
import { GenerateConsultationNoteDraftDto } from './dto/generate-consultation-note-draft.dto';
import { GenerateFollowUpQuestionsDto } from './dto/generate-follow-up-questions.dto';
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

  @Post('consultation-note-draft')
  @Roles('Admin', 'Staff')
  @RequirePermissions('USE_AI_COPILOT')
  @ApiOperation({ summary: 'Generate AI consultation note draft' })
  async generateConsultationNoteDraft(
    @Req() req: any,
    @Body() dto: GenerateConsultationNoteDraftDto,
  ) {
    const userId = req.user.id;
    return this.aiService.generateConsultationNoteDraft({
      userId,
      ...dto,
    });
  }

  @Post('follow-up-questions')
  @Roles('Admin', 'Staff')
  @RequirePermissions('USE_AI_COPILOT')
  @ApiOperation({ summary: 'Generate safe follow-up questions' })
  async generateFollowUpQuestions(
    @Req() req: any,
    @Body() dto: GenerateFollowUpQuestionsDto,
  ) {
    const userId = req.user.id;
    return this.aiService.generateFollowUpQuestions({
      userId,
      ...dto,
    });
  }
}
