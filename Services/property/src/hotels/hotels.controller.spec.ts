import { Test, TestingModule } from '@nestjs/testing';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { hotelsProviders } from './hotels.providers';
import { databaseProviders } from '../database/database.providers';


describe('Hotels Controller', () =>
{
	let controller: HotelsController;


	beforeEach(async () =>
	{
		const module: TestingModule = await Test.createTestingModule({
  			controllers: [HotelsController],
			providers: [HotelsService, ...hotelsProviders, ...databaseProviders],
		}).compile();

		controller = module.get<HotelsController>(HotelsController);
	});


	it('should be defined', () =>
	{
		expect(controller).toBeDefined();
	});
});
