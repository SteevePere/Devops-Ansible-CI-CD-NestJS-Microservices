import { Test, TestingModule } from '@nestjs/testing';
import { HotelsService } from './hotels.service';
import { hotelsProviders } from './hotels.providers';
import { databaseProviders } from '../database/database.providers';


describe('Hotels Service', () =>
{
	const existingHotelId = 1;
	const address = 'address1';
	const phoneNumber = 'phone1';
	const newAddress = 'address2';
	const newPhoneNumber = 'phone2';

	let service: HotelsService;
	let totalHotels: number;
	let hotelToCreate = { HTL_ADDRESS: address, HTL_PHONE_NUMBER: phoneNumber };
	let hotelToUpdate = { HTL_ID: existingHotelId, HTL_ADDRESS: newAddress, HTL_PHONE_NUMBER: newPhoneNumber };


	beforeEach(async () =>
	{
		const module: TestingModule = await Test.createTestingModule({
  			providers: [HotelsService, ...hotelsProviders, ...databaseProviders],
		}).compile();

		service = module.get<HotelsService>(HotelsService);
		totalHotels = (await service.findAll()).length;
	});


	it('should be defined', () =>
	{
		expect(service).toBeDefined();
	});


	describe('Create one Hotel', () =>
	{
		it('should create a row', async () =>
		{
			const previousHotels = totalHotels;
			await service.create(hotelToCreate);
			totalHotels = (await service.findAll()).length;

			expect(totalHotels).toEqual(previousHotels + 1);
		});
	});


	describe('Find all Hotels', () =>
	{
		it('should return an array', async () =>
		{
			const allHotels = await service.findAll();

			expect(Array.isArray(allHotels)).toBe(true);
		});

		it('should have correct length', async () =>
		{
			const allHotelsLength = (await service.findAll()).length;

			expect(allHotelsLength).toEqual(totalHotels);
		});
	});


	describe('Find one Hotel', () =>
	{
		it('should return the right row', async () =>
		{
			const hotelFound = await service.findOne(existingHotelId);

			expect(hotelFound.HTL_ADDRESS).toEqual(address);
			expect(hotelFound.HTL_PHONE_NUMBER).toEqual(phoneNumber);
		});
	});


	describe('Update one Hotel', () =>
	{
		it('should update a row', async () =>
		{
			const hotelUpdated = await service.update(hotelToUpdate);

			expect(hotelUpdated.HTL_ADDRESS).toEqual(newAddress);
			expect(hotelUpdated.HTL_PHONE_NUMBER).toEqual(newPhoneNumber);
		});
	});


	describe('Delete one Hotel', () =>
	{
		it('should delete a row', async () =>
		{
			const previousHotels = totalHotels;
			await service.delete(existingHotelId);
			totalHotels = (await service.findAll()).length;

			expect(totalHotels).toEqual(previousHotels - 1);
		});
	});
});
