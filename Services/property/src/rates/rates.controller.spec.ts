import { Test, TestingModule } from '@nestjs/testing';
import { RatesController } from './rates.controller';
import { RatesService } from './rates.service';
import { ratesProviders } from './rates.providers';
import { databaseProviders } from '../database/database.providers';


describe('Rates Controller', () =>
{
	let controller: RatesController;


	beforeEach(async () =>
	{
		const module: TestingModule = await Test.createTestingModule({
  			controllers: [RatesController],
			providers: [RatesService, ...ratesProviders, ...databaseProviders],
		}).compile();

		controller = module.get<RatesController>(RatesController);
	});


	it('should be defined', () =>
	{
		expect(controller).toBeDefined();
	});
});
