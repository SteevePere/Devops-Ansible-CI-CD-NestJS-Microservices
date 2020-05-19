import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { roomsProviders } from './rooms.providers';
import { databaseProviders } from '../database/database.providers';


describe('Rooms Controller', () =>
{
	let controller: RoomsController;


	beforeEach(async () =>
	{
		const module: TestingModule = await Test.createTestingModule({
  			controllers: [RoomsController],
			providers: [RoomsService, ...roomsProviders, ...databaseProviders],
		}).compile();

		controller = module.get<RoomsController>(RoomsController);
	});


	it('should be defined', () =>
	{
		expect(controller).toBeDefined();
	});
});
