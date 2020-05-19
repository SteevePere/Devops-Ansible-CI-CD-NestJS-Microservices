import { rooms_rom } from './rooms.entity';


export const roomsProviders = [
	{
    	provide: 'ROOMS_REPOSITORY',
    	useValue: rooms_rom,
	},
];
