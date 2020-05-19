import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { where } from 'sequelize/types';

import { services_svc } from './services.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';


@Injectable()
export class ServicesService
{

	private readonly services: services_svc[] = [];


	constructor(
    	@Inject('SERVICES_REPOSITORY')
    	private readonly servicesRepository: typeof services_svc,
	) {}


	async create(createServiceDto: CreateServiceDto): Promise<services_svc>
	{
		const service = new services_svc();
		service.SVT_ID = createServiceDto.SVT_ID;
		service.HTL_ID = createServiceDto.HTL_ID;

		return service.save();
	}


	async findAll(): Promise<services_svc[]>
	{
		return this.servicesRepository.findAll<services_svc>();
	}


	async findOne(serviceId: number)
	{
		return this.servicesRepository.findOne<services_svc>({
  			where: { SVC_ID: serviceId },
    	});
	}


	async update(updateServiceDto: UpdateServiceDto)
	{
		let service = await this.servicesRepository.findByPk(updateServiceDto.SVC_ID);

		if (!service) { throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST); }
		service = await service.update(updateServiceDto);

		return service;
	}


	async delete(serviceId: number)
	{
		return this.servicesRepository.destroy({ where: {
			SVC_ID: serviceId
		}});
	}
}
