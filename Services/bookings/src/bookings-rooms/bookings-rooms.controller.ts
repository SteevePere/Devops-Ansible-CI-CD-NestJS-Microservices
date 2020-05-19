import { UseInterceptors, Controller, Post, Body, Get, Param, Put, Res, NotFoundException, HttpStatus, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { BookingsRoomsService } from './bookings-rooms.service';
import { BookingRoomsDto } from './dto/bookings-rooms.dto';
import { bookings_x_rooms_bxr } from './bookings-rooms.entity';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SentryInterceptor } from '../sentry.interceptor';

@UseInterceptors(SentryInterceptor)
@ApiTags('Rooms')
@ApiBearerAuth()
@Roles(1)
@Controller('bookings-rooms')
export class BookingsRoomsController {

    constructor(private readonly bookingsRoomsService: BookingsRoomsService) {}

    @Post()
	@UseGuards(JwtAuthGuard)
    async bookingsRooms(@Body() bookingRoomsDto: BookingRoomsDto) {
        await this.bookingsRoomsService.create(bookingRoomsDto);
    }

    @Get()
	@UseGuards(JwtAuthGuard, RolesGuard)
    async findAllBookingRooms(): Promise<bookings_x_rooms_bxr[]> {
        return await this.bookingsRoomsService.findAll();
    }

    @Get('/:BXR_ID')
	@UseGuards(JwtAuthGuard)
    async searchBookingById(@Param('BXR_ID') id: number) {
        return await this.bookingsRoomsService.getById(id);
    }

    @Put('/:BXR_ID')
	@UseGuards(JwtAuthGuard)
    async updateBookingDate(@Res() res, @Body() bookingDto: BookingRoomsDto) {
        try {
            await this.bookingsRoomsService.updateBooking(bookingDto);
            return res.status(HttpStatus.OK).json({
                message: `booking ${bookingDto.BXR_ID} has been successfully updated`
            });
        } catch(e) {
            throw new NotFoundException(`${bookingDto.BXR_ID} does not exist! `);
        }
    }


    @Get('/unavailable/:ROM_ID')
	@UseGuards(JwtAuthGuard)
    async getBookingOccupencyById(@Param('ROM_ID') id: number) {
        return await this.bookingsRoomsService.getRoomOccupencyById(id);
    }

    @Get('/all-booking/room')
	@UseGuards(JwtAuthGuard, RolesGuard)
    async getBookingOccupency() {
        return await this.bookingsRoomsService.getRoomOccupency();
    }

    @Delete('/:BXR_ID')
	@UseGuards(JwtAuthGuard, RolesGuard)
    async deleteBookingDate(@Res() res, @Param('BXR_ID') BXR_ID: number) {
        try {
            await this.bookingsRoomsService.deleteBooking(BXR_ID);
            return res.status(HttpStatus.OK).json({
                message: `booking room ${BXR_ID} has been deleted `
            });
        } catch(e) {
            throw new NotFoundException(`${BXR_ID} does not exist! `);
        }
    }
}
