import { Injectable, Inject, All } from '@nestjs/common';
import { bookings_x_rooms_bxr } from './bookings-rooms.entity';
import { BookingRoomsDto } from './dto/bookings-rooms.dto';
import { bookings_bkg } from '../bookings/bookings.entity';

@Injectable()
export class BookingsRoomsService {
    
    constructor(
        @Inject('BOOKINGS_ROOMS_REPOSITORY')
        private readonly bookingsRoomsRepository: typeof bookings_x_rooms_bxr
    ) {}

    async create(bookingRoomDto: BookingRoomsDto): Promise<bookings_x_rooms_bxr> {
        const newBookingsRooms = new bookings_x_rooms_bxr();
        newBookingsRooms.BXR_ID = bookingRoomDto.BXR_ID;
        newBookingsRooms.BKG_ID = bookingRoomDto.BKG_ID;
        newBookingsRooms.BXR_OCCUPANCY = bookingRoomDto.BXR_OCCUPANCY;
        newBookingsRooms.ROM_ID = bookingRoomDto.ROM_ID;

        return newBookingsRooms.save();
    }

    async findAll(): Promise<bookings_x_rooms_bxr[]>{
        return this.bookingsRoomsRepository.findAll<bookings_x_rooms_bxr>();
    } 

    async updateBooking(bookingDto: BookingRoomsDto) {
        return this.bookingsRoomsRepository.update({
            BKG_ID: bookingDto.BKG_ID,
            BXR_OCCUPANCY: bookingDto.BXR_OCCUPANCY,
            ROM_ID: bookingDto.ROM_ID,
            BXR_ID: bookingDto.BXR_ID
        }, { where: {
            BXR_ID: bookingDto.BXR_ID
        }})
    }

    async getById(id: number): Promise<bookings_x_rooms_bxr[]> {
        return this.bookingsRoomsRepository.
        findOne<bookings_x_rooms_bxr>({
            where: {
                BXR_ID: id
            }
        })
    }

    async deleteBooking(BXR_ID: number) {
        return this.bookingsRoomsRepository.destroy({where: {
            BXR_ID: BXR_ID
        }})
    }
    
    async getRoomOccupencyById(id: number): Promise<bookings_x_rooms_bxr[]> {
        bookings_x_rooms_bxr.belongsTo(bookings_bkg, {foreignKey: 'BKG_ID'});
        bookings_bkg.hasMany(bookings_x_rooms_bxr, {foreignKey: 'BKG_ID'});
        return await bookings_x_rooms_bxr.findAll({
            include: [bookings_bkg],
            attributes: ['ROM_ID','BXR_ID'],
            where: {
                ROM_ID: id
            }
        });
    }

    async getRoomOccupency(): Promise<bookings_x_rooms_bxr[]> {
        bookings_x_rooms_bxr.belongsTo(bookings_bkg, {foreignKey: 'BKG_ID'});
        bookings_bkg.hasMany(bookings_x_rooms_bxr, {foreignKey: 'BKG_ID'});
       
        return await bookings_x_rooms_bxr.findAll({
            attributes: ['ROM_ID','BXR_ID'],
            include: [{ 
                model: bookings_bkg,
                attributes: ['USR_ID', 'BKG_START_DATETIME', 'BKG_END_DATETIME']
            }]
        });
    }
    

}
