import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Hotels } from '../../../common/databases/in-memory-database/enums/hotels.enum';
import { Rooms } from '../../../common/databases/in-memory-database/enums/rooms.enum';

export class CreateOrderDto {
  @IsEnum(Hotels)
  @IsNotEmpty()
  @ApiProperty({ description: 'Hotel id', example: 'reddison' })
  public hotel_id: Hotels; // FIXME: Тут действиетльно айдишка? Может лучше ее назвать hotel_name?

  @IsEnum(Rooms)
  @IsNotEmpty()
  @ApiProperty({ description: 'Room id', example: 'lux' })
  public room_id: Rooms; // FIXME: Может лучше назвать room_type?

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'Email', example: 'guest@mail.ru' })
  public email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Datetime from',
    example: '2024-01-02T00:00:00Z',
  })
  public from: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Datetime to', example: '2024-01-04T00:00:00Z' })
  public to: string;
}
