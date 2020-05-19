import { Test, TestingModule } from '@nestjs/testing';
import { RoomTypesController } from './roomTypes.controller';
import { RoomTypesService } from './roomTypes.service';
import { roomTypesProviders } from './roomTypes.providers';
import { databaseProviders } from '../database/database.providers';


describe('Room Types Controller', () =>
{
	let controller: RoomTypesController;


	beforeEach(async () =>
	{
		const module: TestingModule = await Test.createTestingModule({
  			controllers: [RoomTypesController],
			providers: [RoomTypesService, ...roomTypesProviders, ...databaseProviders],
		}).compile();

		controller = module.get<RoomTypesController>(RoomTypesController);
	});


	it('should be defined', () =>
	{
		expect(controller).toBeDefined();
	});
});
