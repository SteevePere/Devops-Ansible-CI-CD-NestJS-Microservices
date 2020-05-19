import { Body, Controller, Get, Param, Post, Put, Delete, Res, Query, HttpStatus, NotFoundException, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ServicesService } from './services.service';
import {services_svc } from './services.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { SentryInterceptor } from '../sentry.interceptor';


@UseInterceptors(SentryInterceptor)
@ApiTags('Services')
@Controller('services')
@ApiBearerAuth()
@Roles(1)
export class ServicesController
{

	constructor(private readonly servicesService: ServicesService) {}


	@Post()
	@UseGuards(JwtAuthGuard, RolesGuard)
	async create(@Body() createServiceDto: CreateServiceDto)
	{
		await this.servicesService.create(createServiceDto);
	}


	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<services_svc[]>
	{
		return await this.servicesService.findAll();
	}


	@Get(':id')
	@UseGuards(JwtAuthGuard)
	@ApiParam({ name: 'id', type: String })
	async findOne(@Param('id') id: string): Promise<services_svc>
	{
		return await this.servicesService.findOne(+id);
	}


	@Put()
	@UseGuards(JwtAuthGuard, RolesGuard)
	async update(@Body() updateServiceDto: UpdateServiceDto)
	{
		return await this.servicesService.update(updateServiceDto);
    }


	@Delete(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiParam({ name: 'id', type: String })
	async remove(@Res() response, @Param('id') id: string): Promise<services_svc>
	{
		const deletedService = await this.servicesService.delete(+id);

		if (deletedService === 0) { throw new NotFoundException(`Service ${id} does not exist`); }

		return response.status(HttpStatus.OK).json({
			statusCode: 200,
			message: `Service ${id} has been deleted`
		});
	}
}
