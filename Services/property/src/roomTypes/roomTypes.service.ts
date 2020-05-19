import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { where } from 'sequelize/types';

import { roomtypes_rmt } from './roomTypes.entity';
import { CreateRoomTypeDto } from './dto/create-roomType.dto';
import { UpdateRoomTypeDto } from './dto/update-roomType.dto';


@Injectable()
export class RoomTypesService
{

	private readonly roomTypes: roomtypes_rmt[] = [];


	constructor(
    	@Inject('ROOM_TYPES_REPOSITORY')
    	private readonly roomTypesRepository: typeof roomtypes_rmt,
	) {}


	async create(createRoomTypeDto: CreateRoomTypeDto): Promise<roomtypes_rmt>
	{
		const roomType = new roomtypes_rmt();
		roomType.RTE_ID = createRoomTypeDto.RTE_ID;
		roomType.RMT_NAME = createRoomTypeDto.RMT_NAME;
		roomType.RMT_MAX_OCCUPANCY = createRoomTypeDto.RMT_MAX_OCCUPANCY;

		return roomType.save();
	}


	async findAll(): Promise<roomtypes_rmt[]>
	{
		return this.roomTypesRepository.findAll<roomtypes_rmt>();
	}


	async findOne(roomTypeId: number)
	{
		return this.roomTypesRepository.findOne<roomtypes_rmt>({
  			where: { RMT_ID: roomTypeId },
    	});
	}


	async update(updateRoomTypeDto: UpdateRoomTypeDto)
	{
		let roomType = await this.roomTypesRepository.findByPk(updateRoomTypeDto.RMT_ID);

		if (!roomType) { throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST); }
		roomType = await roomType.update(updateRoomTypeDto);

		return roomType;
	}


	async delete(roomTypeId: number)
	{
		return this.roomTypesRepository.destroy({ where: {
			RMT_ID: roomTypeId
		}});
	}
}
