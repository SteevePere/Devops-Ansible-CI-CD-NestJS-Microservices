import { Test, TestingModule } from '@nestjs/testing';
import { RatesService } from './rates.service';
import { ratesProviders } from './rates.providers';
import { databaseProviders } from '../database/database.providers';


describe('Rates Service', () =>
{
	const existingRateId = 1;
	const amount = 100.00;
	const newAmount = 101.00;
	const amountString = amount.toFixed(2);

	let service: RatesService;
	let totalRates: number;
	let rateToCreate = { RTE_AMOUNT: amount };
	let rateToUpdate = { RTE_ID: existingRateId, RTE_AMOUNT: newAmount };


	beforeEach(async () =>
	{
		const module: TestingModule = await Test.createTestingModule({
  			providers: [RatesService, ...ratesProviders, ...databaseProviders],
		}).compile();

		service = module.get<RatesService>(RatesService);
		totalRates = (await service.findAll()).length;
	});


	it('should be defined', () =>
	{
		expect(service).toBeDefined();
	});


	describe('Create one Rate', () =>
	{
		it('should create a row', async () =>
		{
			const previousRates = totalRates;
			await service.create(rateToCreate);
			totalRates = (await service.findAll()).length;

			expect(totalRates).toEqual(previousRates + 1);
		});
	});


	describe('Find all Rates', () =>
	{
		it('should return an array', async () =>
		{
			const allRates = await service.findAll();

			expect(Array.isArray(allRates)).toBe(true);
		});

		it('should have correct length', async () =>
		{
			const allRatesLength = (await service.findAll()).length;

			expect(allRatesLength).toEqual(totalRates);
		});
	});


	describe('Find one Rate', () =>
	{
		it('should return the right row', async () =>
		{
			const rateFound = await service.findOne(existingRateId);

			expect(rateFound.RTE_AMOUNT).toEqual(amountString);
		});
	});


	describe('Update one Rate', () =>
	{
		it('should update a row', async () =>
		{
			const rateUpdated = await service.update(rateToUpdate);

			expect(rateUpdated.RTE_AMOUNT).toEqual(newAmount);
		});
	});


	describe('Delete one Rate', () =>
	{
		it('should delete a row', async () =>
		{
			const previousRates = totalRates;
			await service.delete(existingRateId);
			totalRates = (await service.findAll()).length;

			expect(totalRates).toEqual(previousRates - 1);
		});
	});
});
