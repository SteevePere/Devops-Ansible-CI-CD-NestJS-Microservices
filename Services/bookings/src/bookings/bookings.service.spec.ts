import { Test, TestingModule } from '@nestjs/testing';
import { BookingsService } from './bookings.service';
import { bookingsProviders } from './bookings.providers';
import { databaseProviders } from '../database/database.providers';

describe('BookingsService', () => {
  let service: BookingsService;

  const bookingID = 20;
  const USR_ID = 19;
  const BKG_END_DATETIME_OUT = '2020-03-27T00:00:00.000Z';
  const BKG_START_DATETIME_OUT = '2020-03-26T00:00:00.000Z';
  const BKG_START_DATETIME_OUT_UPDATE = '2020-03-25T00:00:00.000Z';
  let bookingDto = {
    BKG_ID: bookingID,
    USR_ID: USR_ID,
    BKG_START_DATETIME: "2020-03-26",
    BKG_END_DATETIME: "2020-03-27"
  };

  let bookingDtoGet = {
    BKG_ID: bookingID,
    USR_ID: USR_ID,
    BKG_START_DATETIME: "2020-03-26T00:00:00.000Z",
    BKG_END_DATETIME: "2020-03-27T00:00:00.000Z"
  };

  let bookingDtoUPDATE = {
    BKG_ID: bookingID,
    USR_ID: USR_ID,
    BKG_START_DATETIME: "2020-03-25",
    BKG_END_DATETIME: "2020-03-27"
  };

  let allBooking: number;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingsService, ...bookingsProviders, ...databaseProviders],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
    service.findAll().then(data => {
      allBooking = data.length
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('BookingsService - Booking', async () => {
    await service.create(bookingDto).then(
      data => {
        expect(data.BKG_ID).toEqual(bookingID);
      }
    )
  });

  test('BookingsService - Get Booking By ID ', async () => {
    await service.getById(bookingID).then(
      data => {
        expect(data['dataValues']['BKG_START_DATETIME']).toEqual(new Date(BKG_START_DATETIME_OUT));
        expect(data['dataValues']['BKG_END_DATETIME']).toEqual(new Date(BKG_END_DATETIME_OUT));
        expect(data['dataValues']['USR_ID']).toEqual(USR_ID);
        expect(data['dataValues']['BKG_ID']).toEqual(bookingID);
      }
    )
  });


  test('BookingsService - Get By DATE', async () => {
    await service.getByDateBooking(BKG_START_DATETIME_OUT, BKG_END_DATETIME_OUT).then(
      data => {

        data.forEach(element => {
          if (element['dataValues']['BKG_ID'] === bookingID) {
            expect(element['dataValues']['BKG_START_DATETIME']).toEqual(new Date(BKG_START_DATETIME_OUT));
            expect(element['dataValues']['BKG_END_DATETIME']).toEqual(new Date(BKG_END_DATETIME_OUT));
            expect(element['dataValues']['USR_ID']).toEqual(USR_ID);
            expect(element['dataValues']['BKG_ID']).toEqual(bookingID);
          }
        });

      }
    )
  });

  test('BookingsService - Get All BookingRooms', async () => {
    await service.findAll().then(data => {
      expect(data).toHaveLength(allBooking);
    })
  });

  test('BookingsRoomsService - UPDATE', async () => {
    await service.updateBooking(bookingDtoUPDATE).then(data => {
      expect(data).toHaveLength(1);
    })
  });

  test('BookingsService - Get Booking By ID ', async () => {
    const data = await service.getById(bookingID);
    expect(data['BKG_START_DATETIME']).toEqual(new Date(BKG_START_DATETIME_OUT_UPDATE));
    expect(data['BKG_END_DATETIME']).toEqual(new Date(BKG_END_DATETIME_OUT));
    expect(data['USR_ID']).toEqual(USR_ID);
    expect(data['BKG_ID']).toEqual(bookingID);
  });

  test('BookingsService - DEL Booking BY ID ', async () => {
    await service.deleteBookingDate(bookingID).then(data => {
      expect(data).toEqual(1);
    })
  });


});
