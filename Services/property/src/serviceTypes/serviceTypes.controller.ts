import { Body, Controller, Get, Param, Post, Put, Delete, Res, Query, HttpStatus, NotFoundException, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ServiceTypesService } from './serviceTypes.service';
import { servicetypes_svt } from './serviceTypes.entity';
import { CreateServiceTypeDto } from './dto/create-serviceType.dto';
import { UpdateServiceTypeDto } from './dto/update-serviceType.dto';
import { SentryInterceptor } from '../sentry.interceptor';


@UseInterceptors(SentryInterceptor)
@ApiTags('Service Types')
@Controller('serviceTypes')
@ApiBearerAuth()
@Roles(1)
export class ServiceTypesController
{

	constructor(private readonly serviceTypesService: ServiceTypesService) {}


	@Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
	async create(@Body() createServiceTypeDto: CreateServiceTypeDto)
	{
		await this.serviceTypesService.create(createServiceTypeDto);
	}


	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<servicetypes_svt[]>
	{
		return await this.serviceTypesService.findAll();
	}


	@Get(':id')
	@UseGuards(JwtAuthGuard)
	@ApiParam({ name: 'id', type: String })
	async findOne(@Param('id') id: string): Promise<servicetypes_svt>
	{
		return await this.serviceTypesService.findOne(+id);
	}


	@Put()
	@UseGuards(JwtAuthGuard, RolesGuard)
	async update(@Body() updateServiceTypeDto: UpdateServiceTypeDto)
	{
		return await this.serviceTypesService.update(updateServiceTypeDto);
    }


	@Delete(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiParam({ name: 'id', type: String })
	async remove(@Res() response, @Param('id') id: string): Promise<servicetypes_svt>
	{
		const deletedServiceType = await this.serviceTypesService.delete(+id);

		if (deletedServiceType === 0) { throw new NotFoundException(`Service Type ${id} does not exist`); }

		return response.status(HttpStatus.OK).json({
			statusCode: 200,
			message: `Service Type ${id} has been deleted`
		});
	}
}
