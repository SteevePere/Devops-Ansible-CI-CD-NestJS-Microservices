import { rates_rte } from './rates.entity';


export const ratesProviders = [
	{
    	provide: 'RATES_REPOSITORY',
    	useValue: rates_rte,
	},
];
