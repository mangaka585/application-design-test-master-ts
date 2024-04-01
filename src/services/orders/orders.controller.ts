import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Order } from '../../common/databases/in-memory-database/entities/order.entity';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @ApiOperation({ description: 'Create order' })
  @ApiCreatedResponse({ description: 'Created order information', type: Order })
  @ApiBadRequestResponse({
    description: 'Invalid request (validation failed)',
  })
  @ApiConflictResponse({
    description: 'Hotel room is not available for some dates',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createOrder(@Body() body: CreateOrderDto) {
    return this.ordersService.createOrder(body);
  }
}
