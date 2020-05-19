import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { where } from 'sequelize/types';

import { rates_rte } from './rates.entity';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';


@Injectable()
export class RatesService
{

	private readonly rates: rates_rte[] = [];


	constructor(
    	@Inject('RATES_REPOSITORY')
    	private readonly ratesRepository: typeof rates_rte,
	) {}


	async create(createRateDto: CreateRateDto): Promise<rates_rte>
	{
    	const rate = new rates_rte();
    	rate.RTE_AMOUNT = createRateDto.RTE_AMOUNT;

		return rate.save();
	}


	async findAll(): Promise<rates_rte[]>
	{
		return this.ratesRepository.findAll<rates_rte>();
	}


	async findOne(rateId: number)
	{
		return this.ratesRepository.findOne<rates_rte>({
  			where: { RTE_ID: rateId },
    	});
	}


	async update(updateRateDto: UpdateRateDto)
	{
		let rate = await this.ratesRepository.findByPk(updateRateDto.RTE_ID);

		if (!rate) { throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST); }
		rate = await rate.update(updateRateDto);

		return rate;
	}


	async delete(rateId: number)
	{
		return this.ratesRepository.destroy({ where: {
			RTE_ID: rateId
		}});
	}
}
