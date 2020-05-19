import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BookingsModule } from './bookings/bookings.module';
import { BookingsRoomsModule } from './bookings-rooms/bookings-rooms.module';
import { BookinsServicesModule } from './bookings-services/bookins-services.module';

@Module({
  imports: [DatabaseModule, AuthModule, BookingsModule, BookingsRoomsModule, BookinsServicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
