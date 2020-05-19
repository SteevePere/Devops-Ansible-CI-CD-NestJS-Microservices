import { roomtypes_rmt } from './roomTypes.entity';


export const roomTypesProviders = [
	{
    	provide: 'ROOM_TYPES_REPOSITORY',
    	useValue: roomtypes_rmt,
	},
];
