import { Test, TestingModule } from '@nestjs/testing';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { servicesProviders } from './services.providers';
import { databaseProviders } from '../database/database.providers';


describe('Services Controller', () =>
{
	let controller: ServicesController;


	beforeEach(async () =>
	{
		const module: TestingModule = await Test.createTestingModule({
  			controllers: [ServicesController],
			providers: [ServicesService, ...servicesProviders, ...databaseProviders],
		}).compile();

		controller = module.get<ServicesController>(ServicesController);
	});


	it('should be defined', () =>
	{
		expect(controller).toBeDefined();
	});
});
