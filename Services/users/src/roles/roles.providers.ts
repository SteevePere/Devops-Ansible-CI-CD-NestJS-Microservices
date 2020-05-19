import { roles_rle } from './roles.entity';

export const rolesProviders = [
  {
    provide: 'ROLES_REPOSITORY',
    useValue: roles_rle,
  },
];
