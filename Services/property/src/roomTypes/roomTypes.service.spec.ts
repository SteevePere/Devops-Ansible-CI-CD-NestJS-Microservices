import { Test, TestingModule } from '@nestjs/testing';
import { RoomTypesService } from './roomTypes.service';
import { roomTypesProviders } from './roomTypes.providers';
import { databaseProviders } from '../database/database.providers';


describe('RoomTypes Service', () =>
{
	const existingRoomTypeId = 1;
	const rateId = 2;
	const roomTypeName = 'room type name';
	const newRoomTypeName = 'new room type name';
	const roomTypeOccupancy = 2;
	const newRoomTypeOccupancy = 3;

	let service: RoomTypesService;
	let totalRoomTypes: number;
	let roomTypeToCreate = {
		RTE_ID: rateId,
		RMT_NAME: roomTypeName,
		RMT_MAX_OCCUPANCY: roomTypeOccupancy
	};
	let roomTypeToUpdate = {
		RMT_ID: existingRoomTypeId,
		RTE_ID: rateId,
		RMT_NAME: newRoomTypeName,
		RMT_MAX_OCCUPANCY: newRoomTypeOccupancy
	};


	beforeEach(async () =>
	{
		const module: TestingModule = await Test.createTestingModule({
  			providers: [RoomTypesService, ...roomTypesProviders, ...databaseProviders],
		}).compile();

		service = module.get<RoomTypesService>(RoomTypesService);
		totalRoomTypes = (await service.findAll()).length;
	});


	it('should be defined', () =>
	{
		expect(service).toBeDefined();
	});


	describe('Create one RoomType', () =>
	{
		it('should create a row', async () =>
		{
			const previousRoomTypes = totalRoomTypes;
			await service.create(roomTypeToCreate);
			totalRoomTypes = (await service.findAll()).length;

			expect(totalRoomTypes).toEqual(previousRoomTypes + 1);
		});
	});


	describe('Find all RoomTypes', () =>
	{
		it('should return an array', async () =>
		{
			const allRoomTypes = await service.findAll();

			expect(Array.isArray(allRoomTypes)).toBe(true);
		});

		it('should have correct length', async () =>
		{
			const allRoomTypesLength = (await service.findAll()).length;

			expect(allRoomTypesLength).toEqual(totalRoomTypes);
		});
	});


	describe('Find one RoomType', () =>
	{
		it('should return the right row', async () =>
		{
			const roomTypeFound = await service.findOne(existingRoomTypeId);

			expect(roomTypeFound.RMT_NAME).toEqual(roomTypeName);
			expect(roomTypeFound.RMT_MAX_OCCUPANCY).toEqual(roomTypeOccupancy);
		});
	});


	describe('Update one RoomType', () =>
	{
		it('should update a row', async () =>
		{
			const roomTypeUpdated = await service.update(roomTypeToUpdate);

			expect(roomTypeUpdated.RMT_NAME).toEqual(newRoomTypeName);
			expect(roomTypeUpdated.RMT_MAX_OCCUPANCY).toEqual(newRoomTypeOccupancy);
		});
	});


	describe('Delete one RoomType', () =>
	{
		it('should delete a row', async () =>
		{
			const previousRoomTypes = totalRoomTypes;
			await service.delete(existingRoomTypeId);
			totalRoomTypes = (await service.findAll()).length;

			expect(totalRoomTypes).toEqual(previousRoomTypes - 1);
		});
	});
});
