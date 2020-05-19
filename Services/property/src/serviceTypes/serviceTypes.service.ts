import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { where } from 'sequelize/types';

import { servicetypes_svt } from './serviceTypes.entity';
import { CreateServiceTypeDto } from './dto/create-serviceType.dto';
import { UpdateServiceTypeDto } from './dto/update-serviceType.dto';


@Injectable()
export class ServiceTypesService
{

	private readonly serviceTypes: servicetypes_svt[] = [];


	constructor(
    	@Inject('SERVICE_TYPES_REPOSITORY')
    	private readonly serviceTypesRepository: typeof servicetypes_svt,
	) {}


	async create(createServiceTypeDto: CreateServiceTypeDto): Promise<servicetypes_svt>
	{
		const serviceType = new servicetypes_svt();
		serviceType.RTE_ID = createServiceTypeDto.RTE_ID;
		serviceType.SVT_NAME = createServiceTypeDto.SVT_NAME;

		return serviceType.save();
	}


	async findAll(): Promise<servicetypes_svt[]>
	{
		return this.serviceTypesRepository.findAll<servicetypes_svt>();
	}


	async findOne(serviceTypeId: number)
	{
		return this.serviceTypesRepository.findOne<servicetypes_svt>({
  			where: { SVT_ID: serviceTypeId },
    	});
	}


	async update(updateServiceTypeDto: UpdateServiceTypeDto)
	{
		let serviceType = await this.serviceTypesRepository.findByPk(updateServiceTypeDto.SVT_ID);

		if (!serviceType) { throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST); }
		serviceType = await serviceType.update(updateServiceTypeDto);

		return serviceType;
	}


	async delete(serviceTypeId: number)
	{
		return this.serviceTypesRepository.destroy({ where: {
			SVT_ID: serviceTypeId
		}});
	}
}
