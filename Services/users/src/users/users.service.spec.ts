import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { databaseProviders } from '../database/database.providers';
describe('UsersService', () => {
  let usersService: UsersService;
  let totalUsers: number;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, ...usersProviders, ...databaseProviders],
    }).compile();

    usersService = module.get<UsersService>(UsersService);

    totalUsers = (await usersService.findAll()).length

  });

  describe('getAllUser', () => {
    it('should return an array', async () => {
      const allUsers = await usersService.findAll();
      expect(Array.isArray(allUsers)).toBe(true);
    });

    it('should have correct length', async () => {
      const allUsersLength = (await usersService.findAll()).length;

      expect(allUsersLength).toEqual(totalUsers);
    });
  });

  describe('getOneUserById', () => {
    it('should return correct property', async () => {

      const mockUserResult = {
        "USR_ID": 1,
        "RLE_ID": 1,
        "USR_EMAIL": "admin@admin.com",
        "USR_PASSWORD": "admin",
        "USR_ACTIVE": true
      }

      const adminUser = await usersService.findOne(1);

      expect(adminUser.get({ plain: true })).toEqual(mockUserResult);

    });
  });

  describe('UpdateOneUserById', () => {
    it('should return correct property', async () => {

      const mockUserResult = {
        "USR_ID": 1,
        "RLE_ID": 2,
        "USR_EMAIL": "mailChange@admin.com",
        "USR_PASSWORD": "newpassword",
        "USR_ACTIVE": false
      }

      const adminUser = await usersService.update(mockUserResult);

      expect(adminUser.get({ plain: true })).toEqual(mockUserResult);

    });
  });

  describe('DeleteOneUserById', () => {
    it('should return nothing', async () => {

      const mockResult = 1;

      await usersService.deleteOne(1);

      expect(mockResult).toEqual(totalUsers - 1);

    });
  });
});
