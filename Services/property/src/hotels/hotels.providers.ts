import { hotels_htl } from './hotels.entity';


export const hotelsProviders = [
	{
    	provide: 'HOTELS_REPOSITORY',
    	useValue: hotels_htl,
	},
];
