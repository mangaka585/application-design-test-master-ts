import { Hotels } from '../enums/hotels.enum';
import { Rooms } from '../enums/rooms.enum';

export class RoomAvailability {
  public hotel_id: Hotels;
  public room_id: Rooms;
  public date: string;
  public quota: number;
}
