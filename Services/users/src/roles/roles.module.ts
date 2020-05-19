import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { rolesProviders } from './roles.providers';

@Module({
  controllers: [RolesController],
  providers: [RolesService, ...rolesProviders],
})
export class RolesModule {}
