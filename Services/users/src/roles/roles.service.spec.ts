import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles.service';
import { rolesProviders } from "./roles.providers";
import { databaseProviders } from "../database/database.providers";

describe('RolesService', () => {
  let rolesService: RolesService;
  let totalRoles: number;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesService, ...rolesProviders, ...databaseProviders],
    }).compile();

    rolesService = module.get<RolesService>(RolesService);

    totalRoles = (await rolesService.findAll()).length
  });

  describe('getAllRoles', () => {
    it('should return an array', async () => {
      const allRoles = await rolesService.findAll();
      expect(Array.isArray(allRoles)).toBe(true);
    });

    it('should have correct length', async () => {
      const allRolesLength = (await rolesService.findAll()).length;

      expect(allRolesLength).toEqual(totalRoles);
    });
  });

  describe('getOneRoleById', () => {
    it('should return correct property', async () => {

      const mockRoleResult = {
        "RLE_ID": 1,
        "RLE_NAME": "Admin"
      }

      const adminRole = await rolesService.findOne(1);

      expect(adminRole.get({ plain: true })).toEqual(mockRoleResult);

    });
  });

  describe('DeleteOneRoleById', () => {
    it('should return nothing', async () => {

      const mockResult = 2;

      await rolesService.deleteOne(2);

      expect(mockResult).toEqual(totalRoles - 1);

    });
  });
});
