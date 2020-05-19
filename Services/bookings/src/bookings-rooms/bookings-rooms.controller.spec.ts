import { Test, TestingModule } from '@nestjs/testing';
import { BookingsRoomsController } from './bookings-rooms.controller';
import { BookingsRoomsService } from './bookings-rooms.service';
import { bookingsRoomsProviders } from './bookings-rooms.providers';
import { bookingsProviders } from '../bookings/bookings.providers';


describe('BookingsRooms Controller', () => {
  let controller: BookingsRoomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingsRoomsService, ...bookingsRoomsProviders, ...bookingsProviders],
      controllers: [BookingsRoomsController],
    }).compile();

    controller = module.get<BookingsRoomsController>(BookingsRoomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
