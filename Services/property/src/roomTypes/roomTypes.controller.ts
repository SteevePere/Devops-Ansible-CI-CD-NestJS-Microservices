import { Body, Controller, Get, Param, Post, Put, Delete, Res, Query, HttpStatus, NotFoundException, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoomTypesService } from './roomTypes.service';
import { roomtypes_rmt } from './roomTypes.entity';
import { CreateRoomTypeDto } from './dto/create-roomType.dto';
import { UpdateRoomTypeDto } from './dto/update-roomType.dto';
import { SentryInterceptor } from '../sentry.interceptor';


@UseInterceptors(SentryInterceptor)
@ApiTags('Room Types')
@Controller('roomTypes')
@ApiBearerAuth()
@Roles(1)
export class RoomTypesController
{

	constructor(private readonly roomTypesService: RoomTypesService) {}


	@Post()
	@UseGuards(JwtAuthGuard, RolesGuard)
	async create(@Body() createRoomTypeDto: CreateRoomTypeDto)
	{
		await this.roomTypesService.create(createRoomTypeDto);
	}


	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<roomtypes_rmt[]>
	{
		return await this.roomTypesService.findAll();
	}


	@Get(':id')
	@UseGuards(JwtAuthGuard)
	@ApiParam({ name: 'id', type: String })
	async findOne(@Param('id') id: string): Promise<roomtypes_rmt>
	{
		return await this.roomTypesService.findOne(+id);
	}


	@Put()
	@UseGuards(JwtAuthGuard, RolesGuard)
	async update(@Body() updateRoomTypeDto: UpdateRoomTypeDto)
	{
		return await this.roomTypesService.update(updateRoomTypeDto);
    }


	@Delete(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiParam({ name: 'id', type: String })
	async remove(@Res() response, @Param('id') id: string): Promise<roomtypes_rmt>
	{
		const deletedRoomType = await this.roomTypesService.delete(+id);

		if (deletedRoomType === 0) { throw new NotFoundException(`Room Type ${id} does not exist`); }

		return response.status(HttpStatus.OK).json({
			statusCode: 200,
			message: `Room Type ${id} has been deleted`
		});
	}
}
