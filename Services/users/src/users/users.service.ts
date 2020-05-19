import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from "./dto/update-user.dto";
import { users_usr } from './user.entity';

@Injectable()
export class UsersService {
  private readonly users: users_usr[] = [];
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly usersRepository: typeof users_usr,
  ) { }
  async create(createUserDto: CreateUserDto): Promise<users_usr> {
    const user = new users_usr();
    user.RLE_ID = createUserDto.RLE_ID;
    user.USR_EMAIL = createUserDto.USR_EMAIL;
    user.USR_PASSWORD = bcrypt.hashSync(createUserDto.USR_PASSWORD, 10);
    user.USR_ACTIVE = createUserDto.USR_ACTIVE;

    return user.save();
  }

  async findAll(): Promise<users_usr[]> {
	return this.usersRepository.findAll<users_usr>();
  }

  async findOne(idUser: number): Promise<users_usr> {
    return this.usersRepository.findOne<users_usr>({
      where: { USR_ID: idUser },
    });
  }

  async deleteOne(idUser: number) {
    return this.usersRepository.destroy({
      where: { USR_ID: idUser },
    });
  }

  async findOneByEmail(email: string): Promise<users_usr> {
    return this.usersRepository.findOne<users_usr>({
      where: { USR_EMAIL: email },
    });
  }

  async update(updateUserDto: UpdateUserDto) {
    let user = await this.usersRepository.findByPk(updateUserDto.USR_ID);
    if (!user) {
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }
    user = await user.update(updateUserDto)
    return user;
  }
}
