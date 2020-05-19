import { Test, TestingModule } from '@nestjs/testing';
import { BookingsRoomsService } from './bookings-rooms.service';
import { bookingsRoomsProviders } from './bookings-rooms.providers';
import { databaseProviders } from '../database/database.providers';
import { bookings_x_rooms_bxr } from './bookings-rooms.entity';
import { bookingsProviders } from '../bookings/bookings.providers';


describe('BookingsRoomsService', () => {
  let service: BookingsRoomsService;
  const bookingRoomID = 20;
  const bookingDate = 3;
  let bookingRoomDto = {
     BXR_ID: bookingRoomID,
     BKG_ID: bookingDate,
     ROM_ID: 7,
     BXR_OCCUPANCY:2
  };

  let bookingRoomDtoUpdate = {
    BXR_ID: bookingRoomID,
    BKG_ID: bookingDate,
    ROM_ID: 7,
    BXR_OCCUPANCY:3
 };

  let allBooking: number;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingsRoomsService, ...bookingsRoomsProviders, ...databaseProviders, ...bookingsProviders],
    }).compile();

    service = module.get<BookingsRoomsService>(BookingsRoomsService);
    service.findAll().then(data => {
      allBooking = data.length
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('BookingsRoomsService - BookingRooms', async() => {
    await service.create(bookingRoomDto).then(
      data => {
        expect(data.BXR_ID).toEqual(bookingRoomDto.BXR_ID);
      }
    )
  });


  test('BookingsRoomsService - Get BookingRooms BY ID ', async() => {
    await service.getById(bookingRoomID).then(data => {
      expect(data['dataValues']).toEqual(bookingRoomDto);
    })
  });


  test('BookingsRoomsService - Get All BookingRooms', async() => {
    await service.findAll().then(data => {
      expect(data).toHaveLength(allBooking);
    })
  });

  test('BookingsRoomsService - UPDATE BookingRooms', async() => {
    await service.updateBooking(bookingRoomDtoUpdate).then( data => {
      expect(data).toHaveLength(1);
    })
  });


  test('BookingsRoomsService -  BookingRooms Occupency ', async() => {
    const roomOccupency = await service.getRoomOccupency();
      expect(Array.isArray(roomOccupency)).toBe(true);
  });

  test('BookingsRoomsService -  BookingRooms Occupency By Id', async() => {
    await service.getRoomOccupencyById(2).then(data => {
      expect(Array.isArray(data)).toBe(true);
    })
  });

  test('BookingsRoomsService - DEL BookingRooms BY ID ', async() => {
    await service.deleteBooking(bookingRoomID).then(data => {
      expect(data).toEqual(1);
    })
  });
});
