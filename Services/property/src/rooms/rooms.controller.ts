import { Body, Controller, Get, Param, Post, Put, Delete, Res, Query, HttpStatus, NotFoundException, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoomsService } from './rooms.service';
import {rooms_rom } from './rooms.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { SentryInterceptor } from '../sentry.interceptor';


@UseInterceptors(SentryInterceptor)
@ApiTags('Rooms')
@Controller('rooms')
@ApiBearerAuth()
@Roles(1)
export class RoomsController
{

	constructor(private readonly roomsService: RoomsService) {}


	@Post()
	@UseGuards(JwtAuthGuard, RolesGuard)
	async create(@Body() createRoomDto: CreateRoomDto)
	{
		await this.roomsService.create(createRoomDto);
	}


	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<rooms_rom[]>
	{
		return await this.roomsService.findAll();
	}


	@Get(':id')
	@UseGuards(JwtAuthGuard)
	@ApiParam({ name: 'id', type: String })
	async findOne(@Param('id') id: string): Promise<rooms_rom>
	{
		return await this.roomsService.findOne(+id);
	}


	@Put()
	@UseGuards(JwtAuthGuard, RolesGuard)
	async update(@Body() updateRoomDto: UpdateRoomDto)
	{
		return await this.roomsService.update(updateRoomDto);
    }


	@Delete(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiParam({ name: 'id', type: String })
	async remove(@Res() response, @Param('id') id: string): Promise<rooms_rom>
	{
		const deletedRoom = await this.roomsService.delete(+id);

		if (deletedRoom === 0) { throw new NotFoundException(`Room ${id} does not exist`); }

		return response.status(HttpStatus.OK).json({
			statusCode: 200,
			message: `Room ${id} has been deleted`
		});
	}
}
