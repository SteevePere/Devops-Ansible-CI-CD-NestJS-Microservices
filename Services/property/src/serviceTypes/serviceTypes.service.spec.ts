import { Test, TestingModule } from '@nestjs/testing';
import { ServiceTypesService } from './serviceTypes.service';
import { serviceTypesProviders } from './serviceTypes.providers';
import { databaseProviders } from '../database/database.providers';


describe('ServiceTypes Service', () =>
{
	const existingServiceTypeId = 1;
	const rateId = 2;
	const serviceTypeName = 'service type name';
	const newServiceTypeName = 'new service type name';

	let service: ServiceTypesService;
	let totalServiceTypes: number;
	let serviceTypeToCreate = { RTE_ID: rateId, SVT_NAME: serviceTypeName };
	let serviceTypeToUpdate = { SVT_ID: existingServiceTypeId, RTE_ID: rateId, SVT_NAME: newServiceTypeName };


	beforeEach(async () =>
	{
		const module: TestingModule = await Test.createTestingModule({
  			providers: [ServiceTypesService, ...serviceTypesProviders, ...databaseProviders],
		}).compile();

		service = module.get<ServiceTypesService>(ServiceTypesService);
		totalServiceTypes = (await service.findAll()).length;
	});


	it('should be defined', () =>
	{
		expect(service).toBeDefined();
	});


	describe('Create one ServiceType', () =>
	{
		it('should create a row', async () =>
		{
			const previousServiceTypes = totalServiceTypes;
			await service.create(serviceTypeToCreate);
			totalServiceTypes = (await service.findAll()).length;

			expect(totalServiceTypes).toEqual(previousServiceTypes + 1);
		});
	});


	describe('Find all ServiceTypes', () =>
	{
		it('should return an array', async () =>
		{
			const allServiceTypes = await service.findAll();

			expect(Array.isArray(allServiceTypes)).toBe(true);
		});

		it('should have correct length', async () =>
		{
			const allServiceTypesLength = (await service.findAll()).length;

			expect(allServiceTypesLength).toEqual(totalServiceTypes);
		});
	});


	describe('Find one ServiceType', () =>
	{
		it('should return the right row', async () =>
		{
			const serviceTypeFound = await service.findOne(existingServiceTypeId);

			expect(serviceTypeFound.RTE_ID).toEqual(rateId);
			expect(serviceTypeFound.SVT_NAME).toEqual(serviceTypeName);
		});
	});


	describe('Update one ServiceType', () =>
	{
		it('should update a row', async () =>
		{
			const serviceTypeUpdated = await service.update(serviceTypeToUpdate);

			expect(serviceTypeUpdated.SVT_NAME).toEqual(newServiceTypeName);
		});
	});


	describe('Delete one ServiceType', () =>
	{
		it('should delete a row', async () =>
		{
			const previousServiceTypes = totalServiceTypes;
			await service.delete(existingServiceTypeId);
			totalServiceTypes = (await service.findAll()).length;

			expect(totalServiceTypes).toEqual(previousServiceTypes - 1);
		});
	});
});
