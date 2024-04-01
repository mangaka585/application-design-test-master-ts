import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { InMemoryDatabaseModule } from '../../common/databases/in-memory-database/in-memory-database.module';

@Module({
  imports: [InMemoryDatabaseModule],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
