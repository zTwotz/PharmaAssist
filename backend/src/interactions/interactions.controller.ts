import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { RequirePermissions } from '../auth/permissions.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InteractionsService } from './interactions.service';
import { CheckInteractionDto } from './dto/check-interaction.dto';

@ApiTags('Interactions')
@Controller('interactions')
export class InteractionsController {
  constructor(private readonly interactionsService: InteractionsService) {}

  @Post('check')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('CREATE_ORDER')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Kiểm tra tương tác giữa các loại thuốc' })
  @ApiResponse({
    status: 200,
    description: 'Trả về danh sách các tương tác thuốc nếu có.',
  })
  async checkInteractions(@Body() checkInteractionDto: CheckInteractionDto) {
    return this.interactionsService.checkInteractions(
      checkInteractionDto.medicineIds,
    );
  }
}
