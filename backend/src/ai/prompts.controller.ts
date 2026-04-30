import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PromptsService } from './prompts.service';
import {
  CreatePromptDto,
  UpdatePromptStatusDto,
} from './dto/create-prompt.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('prompts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('ai/prompts')
export class PromptsController {
  constructor(private readonly promptsService: PromptsService) {}

  @Get()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get all prompts' })
  async findAll() {
    return this.promptsService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get a specific prompt' })
  async findOne(@Param('id') id: string) {
    return this.promptsService.findOne(id);
  }

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create a new prompt' })
  async create(@Body() dto: CreatePromptDto) {
    return this.promptsService.create(dto);
  }

  @Patch(':id/status')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update prompt status' })
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdatePromptStatusDto,
  ) {
    return this.promptsService.updateStatus(id, dto);
  }
}
