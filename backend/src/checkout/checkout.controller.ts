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
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { RequirePermissions } from '../auth/permissions.decorator';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('v1/checkout')
@UseGuards(SupabaseAuthGuard, PermissionsGuard)
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  @RequirePermissions('checkout.execute_own', 'checkout.execute_all')
  checkout(
    @CurrentUser() user: any,
    @Headers('idempotency-key') idempotencyKey: string,
    @Body() checkoutDto: CheckoutDto,
  ) {
    if (!idempotencyKey) {
      throw new BadRequestException('Idempotency-Key header is required');
    }

    return this.checkoutService.checkout(user.sub, idempotencyKey, checkoutDto);
  }
}
