import { Body, Controller, Get, Param, Post, Put, Delete, Res, Query, HttpStatus, NotFoundException, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { HotelsService } from './hotels.service';
import { hotels_htl } from './hotels.entity';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { SentryInterceptor } from '../sentry.interceptor';


@UseInterceptors(SentryInterceptor)
@ApiTags('Hotels')
@Controller('hotels')
@ApiBearerAuth()
@Roles(1)
export class HotelsController
{

	constructor(private readonly hotelsService: HotelsService) {}


	@Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
	async create(@Body() createHotelDto: CreateHotelDto)
	{
		return await this.hotelsService.create(createHotelDto);
	}


	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<hotels_htl[]>
	{
		return await this.hotelsService.findAll();
	}


	@Get(':id')
	@UseGuards(JwtAuthGuard)
	@ApiParam({ name: 'id', type: String })
	async findOne(@Param('id') id: string): Promise<hotels_htl>
	{
		return await this.hotelsService.findOne(+id);
	}


	@Put()
	@UseGuards(JwtAuthGuard, RolesGuard)
	async update(@Body() updateHotelDto: UpdateHotelDto)
	{
		return await this.hotelsService.update(updateHotelDto);
    }


	@Delete(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiParam({ name: 'id', type: String })
	async remove(@Res() response, @Param('id') id: string): Promise<hotels_htl>
	{
		const deletedHotel = await this.hotelsService.delete(+id);

		if (deletedHotel === 0) { throw new NotFoundException(`Hotel ${id} does not exist`); }

		return response.status(HttpStatus.OK).json({
			statusCode: 200,
			message: `Hotel ${id} has been deleted`
		});
	}
}
