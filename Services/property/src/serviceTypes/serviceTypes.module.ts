import { Module } from '@nestjs/common';
import { ServiceTypesController } from './serviceTypes.controller';
import { ServiceTypesService } from './serviceTypes.service';
import { serviceTypesProviders } from './serviceTypes.providers';


@Module({
	controllers: [ServiceTypesController],
	providers: [ServiceTypesService, ...serviceTypesProviders],
})


export class ServiceTypesModule {}
