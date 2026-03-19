import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { RequirePermissions } from '../auth/permissions.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InteractionsService } from './interactions.service';
import { CheckInteractionDto } from './dto/check-interaction.dto';
import { CreateDrugInteractionDto } from './dto/create-drug-interaction.dto';
import { UpdateDrugInteractionDto } from './dto/update-drug-interaction.dto';
import { AcknowledgeAlertDto } from './dto/acknowledge-alert.dto';

@ApiTags('Interactions')
@Controller('interactions')
export class InteractionsController {
  constructor(private readonly interactionsService: InteractionsService) {}

  @Get()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('MANAGE_DRUG_INTERACTIONS')
  @ApiOperation({ summary: 'Lấy danh sách tất cả luật tương tác thuốc' })
  @ApiResponse({ status: 200, description: 'Danh sách luật tương tác.' })
  async findAll() {
    return this.interactionsService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('MANAGE_DRUG_INTERACTIONS')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo mới một luật tương tác ActiveIngredient' })
  @ApiResponse({
    status: 201,
    description: 'Tạo luật tương tác thành công.',
  })
  async createInteraction(@Body() createDto: CreateDrugInteractionDto) {
    return this.interactionsService.createInteraction(createDto);
  }

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

  @Patch(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('MANAGE_DRUG_INTERACTIONS')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cập nhật một luật tương tác thuốc' })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật luật tương tác thành công.',
  })
  async updateInteraction(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateDrugInteractionDto,
  ) {
    return this.interactionsService.updateInteraction(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('MANAGE_DRUG_INTERACTIONS')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Vô hiệu hoá luật tương tác thuốc' })
  @ApiResponse({
    status: 200,
    description: 'Vô hiệu hoá luật tương tác thành công.',
  })
  async deactivateInteraction(@Param('id', ParseIntPipe) id: number) {
    return this.interactionsService.deactivateInteraction(id);
  }

  @Get('order/:orderId')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('CREATE_ORDER')
  @ApiOperation({ summary: 'Kiểm tra tương tác cho một đơn hàng (Order ID)' })
  @ApiResponse({
    status: 200,
    description: 'Trả về danh sách các tương tác thuốc của đơn hàng.',
  })
  async checkOrderInteractions(
    @Param('orderId', ParseIntPipe) orderId: number,
  ) {
    return this.interactionsService.checkOrderInteractions(orderId);
  }

  @Patch('alerts/:id/acknowledge')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('CREATE_ORDER')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Acknowledge một cảnh báo tương tác (InteractionAlert)',
  })
  @ApiResponse({
    status: 200,
    description: 'Acknowledge thành công.',
  })
  async acknowledgeAlert(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AcknowledgeAlertDto,
    @Req() req: any,
  ) {
    return this.interactionsService.acknowledgeAlert(
      id,
      req.user.sub,
      dto.note,
    );
  }

  @Get('alerts/history')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('MANAGE_DRUG_INTERACTIONS')
  @ApiOperation({ summary: 'Lấy lịch sử cảnh báo tương tác cho Admin' })
  @ApiResponse({
    status: 200,
    description: 'Trả về danh sách lịch sử cảnh báo.',
  })
  async getAlertHistory(
    @Query('severity') severity?: string,
    @Query('orderCode') orderCode?: string,
    @Query('isAcknowledged') isAcknowledged?: string,
  ) {
    const isAck = isAcknowledged === 'true' ? true : isAcknowledged === 'false' ? false : undefined;
    return this.interactionsService.getAlertHistory({
      severity,
      orderCode,
      isAcknowledged: isAck,
    });
  }
}
