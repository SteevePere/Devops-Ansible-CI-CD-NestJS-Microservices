import { Sequelize } from 'sequelize-typescript';
import { bookings_bkg, users_usr } from '../users/user.entity';
import { roles_rle } from '../roles/roles.entity';

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
      sequelize.addModels([bookings_bkg, users_usr, roles_rle]);

      // await sequelize.sync(); // Uncomment this line to synchronise database with models

      return sequelize;
    },
  },
];
