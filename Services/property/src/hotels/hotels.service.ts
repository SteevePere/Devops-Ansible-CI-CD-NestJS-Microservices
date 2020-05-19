import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { where } from 'sequelize/types';

import { hotels_htl } from './hotels.entity';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';


@Injectable()
export class HotelsService
{

	private readonly hotels: hotels_htl[] = [];


	constructor(
    	@Inject('HOTELS_REPOSITORY')
    	private readonly hotelsRepository: typeof hotels_htl,
	) {}


	async create(createHotelDto: CreateHotelDto): Promise<hotels_htl>
	{
		const hotel = await hotels_htl.create({
			HTL_ADDRESS: createHotelDto.HTL_ADDRESS,
			HTL_PHONE_NUMBER: createHotelDto.HTL_PHONE_NUMBER,
		});

		return hotel;
	}


	async findAll(): Promise<hotels_htl[]>
	{
		return this.hotelsRepository.findAll<hotels_htl>();
	}


	async findOne(hotelId: number)
	{
		return this.hotelsRepository.findOne<hotels_htl>({
  			where: { HTL_ID: hotelId },
    	});
	}


	async update(updateHotelDto: UpdateHotelDto)
	{
		let hotel = await this.hotelsRepository.findByPk(updateHotelDto.HTL_ID);

		if (!hotel) { throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST); }
		hotel = await hotel.update(updateHotelDto);

		return hotel;
	}


	async delete(hotelId: number)
	{
		return this.hotelsRepository.destroy({ where: {
			HTL_ID: hotelId
		}});
	}
}
