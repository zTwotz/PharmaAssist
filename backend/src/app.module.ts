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
import { ActiveIngredientsModule } from './active-ingredients/active-ingredients.module';
import { StockImportsModule } from './stock-imports/stock-imports.module';
import { CheckoutModule } from './checkout/checkout.module';
import { AiModule } from './ai/ai.module';
import { Neo4jModule } from './neo4j/neo4j.module';
import { GraphSyncModule } from './graph-sync/graph-sync.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
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
    ActiveIngredientsModule,
    StockImportsModule,
    CheckoutModule,
    AiModule,
    Neo4jModule,
    GraphSyncModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
