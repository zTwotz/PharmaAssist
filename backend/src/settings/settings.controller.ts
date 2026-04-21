import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

class UpdateSettingDto {
  @IsString()
  @IsNotEmpty()
  value: string;
}

@ApiTags('settings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get all system settings' })
  getAllSettings() {
    return this.settingsService.getAllSettings();
  }

  @Get(':key')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get a system setting by key' })
  getSetting(@Param('key') key: string) {
    return this.settingsService.getSetting(key);
  }

  @Patch(':key')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update a system setting value' })
  @ApiBody({ type: UpdateSettingDto })
  updateSetting(@Param('key') key: string, @Body() body: UpdateSettingDto) {
    return this.settingsService.updateSetting(key, body.value);
  }
}
