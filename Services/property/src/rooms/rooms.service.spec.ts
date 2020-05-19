import { Test, TestingModule } from '@nestjs/testing';
import { RoomsService } from './rooms.service';
import { roomsProviders } from './rooms.providers';
import { databaseProviders } from '../database/database.providers';


describe('Rooms Service', () =>
{
	const existingRoomId = 1;
	const roomTypeId = 2;
	const hotelId = 2;
	const roomName = 'room name';
	const newRoomName = 'new room name';

	let service: RoomsService;
	let totalRooms: number;
	let roomToCreate = { RMT_ID: roomTypeId, HTL_ID: hotelId, ROM_NAME: roomName };
	let roomToUpdate = { ROM_ID: existingRoomId, RMT_ID: roomTypeId, HTL_ID: hotelId, ROM_NAME: newRoomName };


	beforeEach(async () =>
	{
		const module: TestingModule = await Test.createTestingModule({
  			providers: [RoomsService, ...roomsProviders, ...databaseProviders],
		}).compile();

		service = module.get<RoomsService>(RoomsService);
		totalRooms = (await service.findAll()).length;
	});


	it('should be defined', () =>
	{
		expect(service).toBeDefined();
	});


	describe('Create one Room', () =>
	{
		it('should create a row', async () =>
		{
			const previousRooms = totalRooms;
			await service.create(roomToCreate);
			totalRooms = (await service.findAll()).length;

			expect(totalRooms).toEqual(previousRooms + 1);
		});
	});


	describe('Find all Rooms', () =>
	{
		it('should return an array', async () =>
		{
			const allRooms = await service.findAll();

			expect(Array.isArray(allRooms)).toBe(true);
		});

		it('should have correct length', async () =>
		{
			const allRoomsLength = (await service.findAll()).length;

			expect(allRoomsLength).toEqual(totalRooms);
		});
	});


	describe('Find one Room', () =>
	{
		it('should return the right row', async () =>
		{
			const roomFound = await service.findOne(existingRoomId);

			expect(roomFound.RMT_ID).toEqual(roomTypeId);
			expect(roomFound.HTL_ID).toEqual(hotelId);
			expect(roomFound.ROM_NAME).toEqual(roomName);
		});
	});


	describe('Update one Room', () =>
	{
		it('should update a row', async () =>
		{
			const roomUpdated = await service.update(roomToUpdate);

			expect(roomUpdated.ROM_NAME).toEqual(newRoomName);
		});
	});


	describe('Delete one Room', () =>
	{
		it('should delete a row', async () =>
		{
			const previousRooms = totalRooms;
			await service.delete(existingRoomId);
			totalRooms = (await service.findAll()).length;

			expect(totalRooms).toEqual(previousRooms - 1);
		});
	});
});
