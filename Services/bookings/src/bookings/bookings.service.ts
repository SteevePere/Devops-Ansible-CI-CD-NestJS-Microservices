import { Injectable, Inject } from '@nestjs/common';
import { bookings_bkg } from './bookings.entity';
import { BookingDto } from './dto/booking.dto';
import { where } from 'sequelize/types';

@Injectable()
export class BookingsService {

    constructor(
        @Inject('BOOKINGS_REPOSITORY')
        private readonly bookingsRepository: typeof bookings_bkg
    ) {}

    async create(bookingsDto: BookingDto): Promise<bookings_bkg> {
        const newBookings = new bookings_bkg();
        newBookings.USR_ID = bookingsDto.USR_ID;
        newBookings.BKG_ID = bookingsDto.BKG_ID;
        newBookings.BKG_START_DATETIME = bookingsDto.BKG_START_DATETIME;
        newBookings.BKG_END_DATETIME = bookingsDto.BKG_END_DATETIME;

        return newBookings.save();
    }

    async findAll(): Promise<bookings_bkg[]> {
        return this.bookingsRepository.findAll<bookings_bkg>();
    }


    async getById(id: number): Promise<bookings_bkg[]> {
        return this.bookingsRepository.
        findOne<bookings_bkg>({
            where: {
                BKG_ID: id
            }
        })    
    }

    async getByDateBooking(START_DATE: string, END_DATE: string): Promise<bookings_bkg[]> {
        return this.bookingsRepository.
        findAll<bookings_bkg>({
            where: {
                BKG_START_DATETIME: START_DATE,
                BKG_END_DATETIME: END_DATE
            }
        });
    }

    async updateBooking(bookingsDto) {
        return this.bookingsRepository.update({
            BKG_START_DATETIME: bookingsDto.BKG_START_DATETIME,
            BKG_END_DATETIME: bookingsDto.BKG_END_DATETIME,
            USR_ID: bookingsDto.USR_ID,
            BKG_ID: bookingsDto.BKG_ID
        }, { where: {
            BKG_ID: bookingsDto.BKG_ID
        }})
    }

    async deleteBookingDate(BKG_ID) {
        return this.bookingsRepository.destroy({where: {
            BKG_ID: BKG_ID
          }})
    }

}
