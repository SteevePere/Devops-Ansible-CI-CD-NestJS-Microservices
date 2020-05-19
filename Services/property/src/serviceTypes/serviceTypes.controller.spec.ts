import { Test, TestingModule } from '@nestjs/testing';
import { ServiceTypesController } from './serviceTypes.controller';
import { ServiceTypesService } from './serviceTypes.service';
import { serviceTypesProviders } from './serviceTypes.providers';
import { databaseProviders } from '../database/database.providers';


describe('Service Types Controller', () =>
{
	let controller: ServiceTypesController;


	beforeEach(async () =>
	{
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ServiceTypesController],
			providers: [ServiceTypesService, ...serviceTypesProviders, ...databaseProviders],
		}).compile();

		controller = module.get<ServiceTypesController>(ServiceTypesController);
	});


	it('should be defined', () =>
	{
		expect(controller).toBeDefined();
	});
});
