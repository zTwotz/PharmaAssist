import {
  Controller,
  Get,
  Patch,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AiConfigService } from './ai-config.service';
import { UpdateAiProviderConfigDto } from './dto/update-ai-provider-config.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('ai-config')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('ai/configs')
export class AiConfigController {
  constructor(private readonly aiConfigService: AiConfigService) {}

  @Get()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get all AI provider configs' })
  async findAll() {
    return this.aiConfigService.findAll();
  }

  @Patch(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update an AI provider config' })
  async update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateAiProviderConfigDto,
  ) {
    const userId = req.user.id;
    return this.aiConfigService.update(id, userId, dto);
  }
}
