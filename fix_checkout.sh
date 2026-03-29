sed -i '' "s/import { SupabaseAuthGuard } from '..\/auth\/supabase-auth.guard';/import { JwtAuthGuard } from '..\/auth\/jwt-auth.guard';/" backend/src/checkout/checkout.controller.ts
sed -i '' "s/import { CurrentUser } from '..\/auth\/current-user.decorator';/import { Req } from '@nestjs\/common';/" backend/src/checkout/checkout.controller.ts
sed -i '' "s/@UseGuards(SupabaseAuthGuard)/@UseGuards(JwtAuthGuard)/" backend/src/checkout/checkout.controller.ts
sed -i '' "s/@CurrentUser() userId: string,/@Req() req: { user: any },/" backend/src/checkout/checkout.controller.ts
sed -i '' "s/return this.checkoutService.checkout(userId, idempotencyKey, checkoutDto);/return this.checkoutService.checkout(req.user, idempotencyKey, checkoutDto);/" backend/src/checkout/checkout.controller.ts
sed -i '' "s/include: { items: true },/include: { details: true },/" backend/src/checkout/checkout.service.ts
sed -i '' "s/order.orderItems/order.details/g" backend/src/checkout/checkout.service.ts
