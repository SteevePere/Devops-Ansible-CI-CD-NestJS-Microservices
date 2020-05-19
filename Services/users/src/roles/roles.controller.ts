import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiParam, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesService } from './roles.service';
import { roles_rle } from './roles.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from "./dto/update-role.dto";
import { SentryInterceptor } from '../sentry.interceptor';

@UseInterceptors(SentryInterceptor)
@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(1)
@ApiTags('Roles')
@ApiBearerAuth()
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  async create(@Body() createRolesDto: CreateRoleDto) {
    await this.rolesService.create(createRolesDto);
  }

  @Get()
  async findAll(): Promise<roles_rle[]> {
    return await this.rolesService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id') id: string): Promise<roles_rle> {
    return await this.rolesService.findOne(+id);
  }

  @Put()
  async update(@Body() updateRolesDto: UpdateRoleDto) {
    return await this.rolesService.update(updateRolesDto)
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  async deleteOne(@Param('id') id: string) {
    return await this.rolesService.deleteOne(+id);
  }
}
