import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiParam, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { users_usr } from './user.entity';
import { UsersService } from './users.service';
import { SentryInterceptor } from '../sentry.interceptor';

@UseInterceptors(SentryInterceptor)
@Controller('users')
@ApiTags('Users')
@Roles(1)
export class UsersController {
  constructor(
	  private readonly usersService: UsersService,
  ) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(): Promise<users_usr[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id') id: string): Promise<users_usr> {
    return await this.usersService.findOne(+id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({ name: 'id', type: String })
  async deleteOne(@Param('id') id: string): Promise<any> {
    await this.usersService.deleteOne(+id);
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(@Body() updateUsersDto: UpdateUserDto) {
    return await this.usersService.update(updateUsersDto);
  }
}
