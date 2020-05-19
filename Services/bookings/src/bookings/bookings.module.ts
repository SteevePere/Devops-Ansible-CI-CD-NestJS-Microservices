import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { bookingsProviders } from './bookings.providers';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService, ...bookingsProviders]
})

export class BookingsModule {}
