import { Body, Controller, Get, Param, Post, Put, Delete, Res, Query, HttpStatus, NotFoundException, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RatesService } from './rates.service';
import { rates_rte } from './rates.entity';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import { SentryInterceptor } from '../sentry.interceptor';


@UseInterceptors(SentryInterceptor)
@ApiTags('Rates')
@Controller('rates')
@ApiBearerAuth()
@Roles(1)
export class RatesController
{

	constructor(private readonly ratesService: RatesService) {}


	@Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
	async create(@Body() createRateDto: CreateRateDto)
	{
		await this.ratesService.create(createRateDto);
	}


	@Get()
	@UseGuards(JwtAuthGuard)
	async findAll(): Promise<rates_rte[]>
	{
		return await this.ratesService.findAll();
	}


	@Get(':id')
	@UseGuards(JwtAuthGuard)
	@ApiParam({ name: 'id', type: String })
	async findOne(@Param('id') id: string): Promise<rates_rte>
	{
		return await this.ratesService.findOne(+id);
	}


	@Put()
	@UseGuards(JwtAuthGuard, RolesGuard)
	async update(@Body() updateRateDto: UpdateRateDto)
	{
		return await this.ratesService.update(updateRateDto);
    }


	@Delete(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiParam({ name: 'id', type: String })
	async remove(@Res() response, @Param('id') id: string): Promise<rates_rte>
	{
		const deletedRate = await this.ratesService.delete(+id);

		if (deletedRate === 0) { throw new NotFoundException(`Rate ${id} does not exist`); }

		return response.status(HttpStatus.OK).json({
			statusCode: 200,
			message: `Rate ${id} has been deleted`
		});
	}
}
