import { Test, TestingModule } from '@nestjs/testing';
import { BookinsServicesService } from './bookins-services.service';
import { databaseProviders } from '../database/database.providers';
import { bookingsServicesProviders } from './bokkings-services.providers';


describe('BookinsServicesService', () => {
  let service: BookinsServicesService;
  const bookingID = 4;
  let allBooking: number;
  const BKG_ID = 3;
  let booking = {
      BXS_ID: bookingID,
      BKG_ID: BKG_ID,
      SVC_ID: 7
  };

  let bookingUPDATE = {
    BXS_ID: bookingID,
    BKG_ID: 3,
    SVC_ID: 7
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookinsServicesService, ...bookingsServicesProviders, ...databaseProviders],
    }).compile();

    service = module.get<BookinsServicesService>(BookinsServicesService);
    allBooking = (await service.findAll()).length;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('BookingsService - Booking', async () => {
    await service.create(booking).then(
      data => {
        expect(data.BXS_ID).toEqual(bookingID);
      }
    )
  });

  test('BookingsService - Get All', async() => {
    await service.findAll().then(data => {
      expect(data).toHaveLength(allBooking);
      data.forEach(element => {
        expect(element.BKG_ID).not.toBeNaN();
      });
    })
  });


  test('BookingsService - Get BY ID ', async() => {
    await service.getById(bookingID).then(data => {
      expect(data['dataValues']).toEqual(booking);
    })
  });


  test('BookingsService - UPDATE BookingRooms', async() => {
    await service.updateBooking(bookingUPDATE).then( async data => {
      expect(data).toHaveLength(1);
      await service.getById(bookingID).then(
        response => {
          expect(response['BXS_ID']).toEqual(bookingID);
          expect(response['BKG_ID']).toEqual(3);
          expect(response['SVC_ID']).toEqual(7);
        }
      )
    })
  });

  test('BookingsService - DEL BookingRooms BY ID ', async() => {
    await service.deleteBooking(bookingID).then(async data => {
      expect(data).toEqual(1);
      await service.findAll().then(
        response => {
          expect(response).toHaveLength(0);
        }
      )
    })
  });

});
