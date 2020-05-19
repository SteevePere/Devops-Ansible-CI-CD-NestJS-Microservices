import { Test, TestingModule } from '@nestjs/testing';
import { rolesProviders } from "./roles.providers";
import { RolesController } from './roles.controller';
import { databaseProviders } from '../database/database.providers';
import { RolesService } from './roles.service';

describe('Roles Controller', () => {
  let rolesService: RolesService;
  let rolesController: RolesController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [RolesService, ...rolesProviders, ...databaseProviders]
    }).compile();

    rolesService = moduleRef.get<RolesService>(RolesService);
    rolesController = moduleRef.get<RolesController>(RolesController);
  });

  it('should be defined', () => {
    expect(rolesController).toBeDefined();
  });
});
