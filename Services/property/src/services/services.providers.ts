import { services_svc } from './services.entity';


export const servicesProviders = [
	{
    	provide: 'SERVICES_REPOSITORY',
    	useValue: services_svc,
	},
];
