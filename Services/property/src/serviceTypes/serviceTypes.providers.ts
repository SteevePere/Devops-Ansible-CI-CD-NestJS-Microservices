import { servicetypes_svt } from './serviceTypes.entity';


export const serviceTypesProviders = [
	{
    	provide: 'SERVICE_TYPES_REPOSITORY',
    	useValue: servicetypes_svt,
	},
];
