import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ProductsModule } from './products/products.module';
import { InteractionsModule } from './interactions/interactions.module';
import { OrdersModule } from './orders/orders.module';
import { MedicinesModule } from './medicines/medicines.module';
import { CategoriesModule } from './categories/categories.module';
import { CustomersModule } from './customers/customers.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { InventoriesModule } from './inventories/inventories.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    RolesModule,
    ProductsModule,
    InteractionsModule,
    OrdersModule,
    MedicinesModule,
    CategoriesModule,
    CustomersModule,
    SuppliersModule,
    InventoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



