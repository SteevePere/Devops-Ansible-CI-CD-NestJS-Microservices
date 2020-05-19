import { Module } from '@nestjs/common';
import { BookingsRoomsService } from './bookings-rooms.service';
import { BookingsRoomsController } from './bookings-rooms.controller';
import { bookingsRoomsProviders } from './bookings-rooms.providers';

@Module({
  providers: [BookingsRoomsService, ...bookingsRoomsProviders],
  controllers: [BookingsRoomsController]
})
export class BookingsRoomsModule {}
