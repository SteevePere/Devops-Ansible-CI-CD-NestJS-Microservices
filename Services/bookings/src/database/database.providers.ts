import { Sequelize } from 'sequelize-typescript';
import { bookings_bkg } from '../bookings/bookings.entity';
import { bookings_x_rooms_bxr } from '../bookings-rooms/bookings-rooms.entity';
import { bookings_x_services_bxs } from '../bookings-services/bookings-services.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DATABASE_HOST,
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'booking',
        logging: false,
      });
      sequelize.addModels([bookings_bkg, bookings_x_rooms_bxr, bookings_x_services_bxs]);

      // await sequelize.sync(); // Uncomment this line to synchronise database with models

      return sequelize;
    },
  },
];
