import { Module } from '@nestjs/common';
import { ActiveIngredientsService } from './active-ingredients.service';
import { ActiveIngredientsController } from './active-ingredients.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ActiveIngredientsController],
  providers: [ActiveIngredientsService],
  exports: [ActiveIngredientsService],
})
export class ActiveIngredientsModule {}
