import {
  Controller,
  Post,
  Body,
  Headers,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutDto } from './dto/checkout.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { RequirePermissions } from '../auth/permissions.decorator';
import { Req } from '@nestjs/common';

@Controller('v1/checkout')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  @RequirePermissions('checkout.execute_own', 'checkout.execute_all')
  checkout(
    @Req() req: { user: any },
    @Headers('idempotency-key') idempotencyKey: string,
    @Body() checkoutDto: CheckoutDto,
  ) {
    if (!idempotencyKey) {
      throw new BadRequestException('Idempotency-Key header is required');
    }

    return this.checkoutService.checkout(req.user, idempotencyKey, checkoutDto);
  }
}
