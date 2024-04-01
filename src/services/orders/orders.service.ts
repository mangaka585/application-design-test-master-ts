import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Rooms } from '../../common/databases/in-memory-database/enums/rooms.enum';
import { Hotels } from '../../common/databases/in-memory-database/enums/hotels.enum';
import { InMemoryDatabaseService } from '../../common/databases/in-memory-database/in-memory-database.service';

import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';

@Injectable()
export class OrdersService {
  constructor(private inMemoryDatabaseService: InMemoryDatabaseService) {}

  public createOrder(dto: CreateOrderDto) {
    this.validateOrder(dto);

    const daysToBook = this.getDaysToBook(dto.to, dto.from);

    this.checkUnavailableDays(dto.hotel_id, dto.room_id, daysToBook);
    const order = this.inMemoryDatabaseService.createOrder(
      dto.hotel_id,
      dto.room_id,
      dto.email,
      daysToBook,
    );

    Logger.log(
      `Order successfully created: ${JSON.stringify(order)}`,
      OrdersService.name,
    );
    return order;
  }

  private checkUnavailableDays(hotelId: Hotels, roomId: Rooms, days: string[]) {
    const unavailableDays = this.inMemoryDatabaseService.checkUnavailableDays(
      hotelId,
      roomId,
      days,
    );

    if (unavailableDays.length) {
      Logger.error(
        `Hotel room is not available for selected dates: ${unavailableDays}`,
        OrdersService.name,
      );
      throw new ConflictException(
        `Hotel room is not available for dates ${unavailableDays}`,
      );
    }
  }

  private getDaysToBook(
    dateTo: CreateOrderDto['to'],
    dateFrom: CreateOrderDto['from'],
  ) {
    const endDate = this.toDay(dateTo);
    let lastDate = this.toDay(dateFrom);
    const bookingDates: dayjs.Dayjs[] = [];

    while (endDate >= lastDate) {
      bookingDates.push(lastDate);
      lastDate = lastDate.add(1, 'day');
    }

    return bookingDates.map((el) => el.toISOString());
  }

  private toDay(date: string) {
    dayjs.extend(utc);
    return dayjs(date).utc().hour(0).minute(0).second(0).millisecond(0);
  }

  private validateOrder(dto: CreateOrderDto) {
    const dateFrom = dayjs(dto.from);
    const dateTo = dayjs(dto.to);

    if (!dateFrom.isValid()) {
      throw new BadRequestException('field "from" is not datetime format');
    }

    if (!dateTo.isValid()) {
      throw new BadRequestException('field "to" is not datetime format');
    }

    if (dateTo <= dateFrom) {
      throw new BadRequestException('datetime "to" must be more than "from"');
    }
  }
}
