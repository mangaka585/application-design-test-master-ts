import { ApiProperty } from '@nestjs/swagger';
import { Hotels } from '../enums/hotels.enum';
import { Rooms } from '../enums/rooms.enum';

export class Order {
  @ApiProperty({ description: 'Hotel id', example: 'reddison' })
  public hotel_id: Hotels;

  @ApiProperty({ description: 'Room id', example: 'lux' })
  public room_id: Rooms;

  @ApiProperty({ description: 'Email', example: 'guest@mail.ru' })
  public user_email: string;

  @ApiProperty({
    description: 'Datetime from',
    example: '2024-01-02T00:00:00Z',
  })
  public from: string;

  @ApiProperty({ description: 'Datetime to', example: '2024-01-04T00:00:00Z' })
  public to: string;
}
