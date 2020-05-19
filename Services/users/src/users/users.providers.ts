import { users_usr } from './user.entity';

export const usersProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: users_usr,
  },
];
