import { Injectable } from '@nestjs/common';
import { Hotels } from './enums/hotels.enum';
import { Rooms } from './enums/rooms.enum';
import { Order } from './entities/order.entity';
import { RoomAvailability } from './entities/room-availability.entity';

@Injectable()
export class InMemoryDatabaseService {
  public availability: RoomAvailability[] = [];
  public orders: Order[] = [];

  onModuleInit() {
    for (let i = 1; i < 6; i++) {
      const date = new Date(Date.UTC(2024, 0, i));

      const availability: RoomAvailability = {
        hotel_id: Hotels.REDDISON,
        room_id: Rooms.LUX,
        date: date.toISOString(),
        quota: i < 5 ? 1 : 0,
      };

      this.availability.push(availability);
    }
  }

  public createOrder(
    hotelId: Hotels,
    roomId: Rooms,
    userEmail: string,
    dates: string[],
  ) {
    for (const date of dates) {
      for (let i = 0; i < this.availability.length; i++) {
        if (this.availability[i]?.date === date) {
          this.availability[i].quota--;
          break;
        }
      }
    }

    const order: Order = {
      hotel_id: hotelId,
      room_id: roomId,
      user_email: userEmail,
      from: dates[0],
      to: dates[dates.length - 1],
    };

    this.orders.push(order);

    return order;
  }

  public checkUnavailableDays(hotelId: Hotels, roomId: Rooms, days: string[]) {
    const unavailableDays: string[] = [];

    for (const day of days) {
      const existDay = this.availability.find(
        (el) =>
          el.date === day && el.hotel_id === hotelId && el.room_id === roomId,
      );

      if (
        !existDay ||
        !existDay.quota ||
        existDay.hotel_id !== hotelId ||
        existDay.room_id !== roomId
      ) {
        unavailableDays.push(day);
      }
    }

    return unavailableDays;
  }
}
