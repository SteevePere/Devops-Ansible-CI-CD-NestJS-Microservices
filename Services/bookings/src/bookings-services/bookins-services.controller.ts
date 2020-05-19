import { UseInterceptors, Controller, Post, Body, Get, Param, Put, Res, NotFoundException, HttpStatus, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { BookinsServicesService } from './bookins-services.service';
import { BookingServicesDto } from './dto/bookings-services.dto';
import { bookings_x_services_bxs } from './bookings-services.entity';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SentryInterceptor } from '../sentry.interceptor';

@UseInterceptors(SentryInterceptor)
@ApiTags('Services')
@ApiBearerAuth()
@Roles(1)
@Controller('bookins-services')
export class BookinsServicesController {

    constructor(private readonly bookingsService: BookinsServicesService) {}

    @Post()
	@UseGuards(JwtAuthGuard)
    async bookingsServices(@Body() bookingServicesDto: BookingServicesDto) {
        await this.bookingsService.create(bookingServicesDto);
    }

    @Get()
	@UseGuards(JwtAuthGuard, RolesGuard)
    async findAllBookingServices(): Promise<bookings_x_services_bxs[]> {
        return await this.bookingsService.findAll();
    }


    @Get('/:BXS_ID')
	@UseGuards(JwtAuthGuard)
    async searchBookingById(@Param('BXS_ID') id: number) {
        return await this.bookingsService.getById(id);
    }

    @Delete('/:BXS_ID')
	@UseGuards(JwtAuthGuard, RolesGuard)
    async deleteBooking(@Res() res, @Param('BXS_ID') BXS_ID: number) {
        try {
            await this.bookingsService.deleteBooking(BXS_ID);
            return res.status(HttpStatus.OK).json({
                message: `booking ${BXS_ID} has been deleted `
            });
        } catch(e) {
            throw new NotFoundException(`${BXS_ID} does not exist! `);
        }
    }

    @Put()
	@UseGuards(JwtAuthGuard)
    async updateBooking(@Res() res, @Body() bookingDto: BookingServicesDto) {
        try {
            await this.bookingsService.updateBooking(bookingDto);
            return res.status(HttpStatus.OK).json({
                message: `booking ${bookingDto.BXS_ID} has been successfully updated`
            });
        } catch(e) {
            throw new NotFoundException(`${bookingDto.BXS_ID} does not exist! `);
        }
    }
}
