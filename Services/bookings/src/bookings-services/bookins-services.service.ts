import { Injectable, Inject } from '@nestjs/common';
import { BookingServicesDto } from './dto/bookings-services.dto';
import { bookings_x_services_bxs } from './bookings-services.entity';

@Injectable()
export class BookinsServicesService {

    constructor(
        @Inject('BOOKINGS_SERVICES_REPOSITORY')
        private readonly bookingsServicesRepository: typeof bookings_x_services_bxs
    ) {}

     async create(bookingServicesDto: BookingServicesDto): Promise<bookings_x_services_bxs> {
         const newBookingServices = new bookings_x_services_bxs();
         newBookingServices.BKG_ID = bookingServicesDto.BKG_ID;
         newBookingServices.BXS_ID = bookingServicesDto.BXS_ID;
         newBookingServices.SVC_ID = bookingServicesDto.SVC_ID;
         return newBookingServices.save();
    }

    async findAll(): Promise<bookings_x_services_bxs[]>{
        return this.bookingsServicesRepository.findAll<bookings_x_services_bxs>();
    } 

    async getById(id: number) {
        return this.bookingsServicesRepository.
        findOne<bookings_x_services_bxs>({
            where: {
                BXS_ID: id
            }
        })
    }

    async updateBooking(bookingDto: BookingServicesDto) {
        return this.bookingsServicesRepository.update({
            BXS_ID: bookingDto.BXS_ID,
            BKG_ID: bookingDto.BKG_ID,
            SVC_ID: bookingDto.SVC_ID
        }, { where: {
            BXS_ID: bookingDto.BXS_ID
        }})
    }

    async deleteBooking(BXS_ID: number) {
        return this.bookingsServicesRepository.destroy({where: {
            BXS_ID: BXS_ID
        }})
    }
}
