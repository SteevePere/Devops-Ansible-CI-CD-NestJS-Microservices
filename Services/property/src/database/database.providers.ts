import { Sequelize } from 'sequelize-typescript';
import { rates_rte } from '../rates/rates.entity';
import { roomtypes_rmt } from '../roomTypes/roomTypes.entity';
import { servicetypes_svt } from '../serviceTypes/serviceTypes.entity';
import { hotels_htl } from '../hotels/hotels.entity';
import { rooms_rom } from '../rooms/rooms.entity';
import { services_svc } from '../services/services.entity';


export const databaseProviders = [
	{
		provide: 'SEQUELIZE',
		useFactory: async () =>
		{
			const sequelize = new Sequelize({
				dialect: 'mysql',
				host: process.env.DATABASE_HOST,
		        port: 3306,
		        username: 'root',
		        password: 'root',
		        database: 'booking',
		        logging: false,
			});

	  		sequelize.addModels([
				rates_rte,
				roomtypes_rmt,
				servicetypes_svt,
				hotels_htl,
				rooms_rom,
				services_svc,
			]);

			return sequelize;
		},
	},
];
