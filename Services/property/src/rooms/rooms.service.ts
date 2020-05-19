import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { where } from 'sequelize/types';

import { rooms_rom } from './rooms.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';


@Injectable()
export class RoomsService
{

	private readonly rooms: rooms_rom[] = [];


	constructor(
    	@Inject('ROOMS_REPOSITORY')
    	private readonly roomsRepository: typeof rooms_rom,
	) {}


	async create(createRoomDto: CreateRoomDto): Promise<rooms_rom>
	{
		const room = new rooms_rom();
		room.RMT_ID = createRoomDto.RMT_ID;
		room.HTL_ID = createRoomDto.HTL_ID;
		room.ROM_NAME = createRoomDto.ROM_NAME;

		return room.save();
	}


	async findAll(): Promise<rooms_rom[]>
	{
		return this.roomsRepository.findAll<rooms_rom>();
	}


	async findOne(roomId: number)
	{
		return this.roomsRepository.findOne<rooms_rom>({
  			where: { ROM_ID: roomId },
    	});
	}


	async update(updateRoomDto: UpdateRoomDto)
	{
		let room = await this.roomsRepository.findByPk(updateRoomDto.ROM_ID);

		if (!room) { throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST); }
		room = await room.update(updateRoomDto);

		return room;
	}


	async delete(roomId: number)
	{
		return this.roomsRepository.destroy({ where: {
			ROM_ID: roomId
		}});
	}
}
