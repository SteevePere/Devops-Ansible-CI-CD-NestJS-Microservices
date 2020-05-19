import { Test, TestingModule } from '@nestjs/testing';
import { ServicesService } from './services.service';
import { servicesProviders } from './services.providers';
import { databaseProviders } from '../database/database.providers';


describe('Services Service', () =>
{
	const existingServiceId = 1;
	const serviceTypeId = 2;
	const hotelId = 2;
	const newServiceTypeId = 3;

	let service: ServicesService;
	let totalServices: number;
	let serviceToCreate = { SVT_ID: serviceTypeId, HTL_ID: hotelId };
	let serviceToUpdate = { SVC_ID: existingServiceId, SVT_ID: newServiceTypeId, HTL_ID: hotelId };


	beforeEach(async () =>
	{
		const module: TestingModule = await Test.createTestingModule({
  			providers: [ServicesService, ...servicesProviders, ...databaseProviders],
		}).compile();

		service = module.get<ServicesService>(ServicesService);
		totalServices = (await service.findAll()).length;
	});


	it('should be defined', () =>
	{
		expect(service).toBeDefined();
	});


	describe('Create one Service', () =>
	{
		it('should create a row', async () =>
		{
			const previousServices = totalServices;
			await service.create(serviceToCreate);
			totalServices = (await service.findAll()).length;

			expect(totalServices).toEqual(previousServices + 1);
		});
	});


	describe('Find all Services', () =>
	{
		it('should return an array', async () =>
		{
			const allServices = await service.findAll();

			expect(Array.isArray(allServices)).toBe(true);
		});

		it('should have correct length', async () =>
		{
			const allServicesLength = (await service.findAll()).length;

			expect(allServicesLength).toEqual(totalServices);
		});
	});


	describe('Find one Service', () =>
	{
		it('should return the right row', async () =>
		{
			const serviceFound = await service.findOne(existingServiceId);

			expect(serviceFound.SVT_ID).toEqual(serviceTypeId);
			expect(serviceFound.HTL_ID).toEqual(hotelId);
		});
	});


	describe('Update one Service', () =>
	{
		it('should update a row', async () =>
		{
			const serviceUpdated = await service.update(serviceToUpdate);

			expect(serviceUpdated.SVT_ID).toEqual(newServiceTypeId);
		});
	});


	describe('Delete one Service', () =>
	{
		it('should delete a row', async () =>
		{
			const previousServices = totalServices;
			await service.delete(existingServiceId);
			totalServices = (await service.findAll()).length;

			expect(totalServices).toEqual(previousServices - 1);
		});
	});
});
