import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './services/orders/orders.module';

@Module({
  imports: [ConfigModule.forRoot(), OrdersModule],
})
export class AppModule {}
