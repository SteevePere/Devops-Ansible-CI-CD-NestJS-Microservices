import { UseInterceptors, Controller, Post, Body, Get, Param, Put, Res, HttpStatus, Delete, NotFoundException, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { BookingsService } from './bookings.service';
import { BookingDto } from './dto/booking.dto';
import { bookings_bkg } from './bookings.entity';
import { ApiParam, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SentryInterceptor } from '../sentry.interceptor';

@UseInterceptors(SentryInterceptor)
@ApiTags('Bookings')
@ApiBearerAuth()
@Roles(1)
@Controller('bookings')
export class BookingsController {

    constructor(private readonly bookingsService: BookingsService) {
    }

    @Post()
	@UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({ description: 'successfully created.'})
    async create(@Body() bookingDto: BookingDto) {
        const dateStart = new Date(bookingDto.BKG_START_DATETIME);
        const dateEnd = new Date(bookingDto.BKG_END_DATETIME);
        if (dateEnd < dateStart) throw new NotFoundException(`Please check range : Start date : ${bookingDto.BKG_START_DATETIME}, End date ${bookingDto.BKG_END_DATETIME}`);
        try {
            await this.bookingsService.create(bookingDto);
        } catch (error) {
            throw new InternalServerErrorException(error.parent.sqlMessage);
        }
    }

    @Get()
	@UseGuards(JwtAuthGuard, RolesGuard)
    @ApiOkResponse()
    async findAll(): Promise<bookings_bkg[]> {
        return await this.bookingsService.findAll();
    }

    @Get('/:startDate/:endDate')
	@UseGuards(JwtAuthGuard)
    @ApiOkResponse()
    async searchByDate(@Param('startDate') startDate: string, @Param('endDate') endDate: string) {
        return await this.bookingsService.getByDateBooking(startDate, endDate);
    }

    @Get('/:id')
	@UseGuards(JwtAuthGuard)
    @ApiOkResponse()
    async searchById(@Param('id') id: number) {
        return await this.bookingsService.getById(id);
    }

    @Put('/:id')
	@UseGuards(JwtAuthGuard)
    async updateBookingDate(@Res() res, @Body() bookingDto: BookingDto) {
        const update = await this.bookingsService.updateBooking(bookingDto);
        if (!update) throw new NotFoundException(`${bookingDto.BKG_ID} does not exist! `);
        return res.status(HttpStatus.OK).json({
            message: 'booking date has been successfully updated',
            update
        });
    }

    @Delete('/:id')
	@UseGuards(JwtAuthGuard, RolesGuard)
    async deleteBookingDate(@Res() res, @Param('id') BKG_ID: string) {
        const deleteBoking = await this.bookingsService.deleteBookingDate(BKG_ID);
        if (!deleteBoking) throw new NotFoundException(`${BKG_ID} does not exist! `);
        return res.status(HttpStatus.OK).json({
            message: `${BKG_ID} has been deleted `
        });
    }
}
