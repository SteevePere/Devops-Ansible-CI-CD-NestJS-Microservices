import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { roles_rle } from './roles.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  private readonly roles: roles_rle[] = [];
  constructor(
    @Inject('ROLES_REPOSITORY')
    private readonly rolesRepository: typeof roles_rle,
  ) { }

  async create(createRoleDto: CreateRoleDto): Promise<roles_rle> {
    const role = new roles_rle();
    role.RLE_NAME = createRoleDto.RLE_NAME;
    return role.save();
  }

  async findAll(): Promise<roles_rle[]> {
    return this.rolesRepository.findAll<roles_rle>();
  }

  async findOne(idRole: number) {
    return this.rolesRepository.findOne<roles_rle>({
      where: { RLE_ID: idRole },
    });
  }

  async update(updateRoleDto: UpdateRoleDto) {
    let role = await this.rolesRepository.findByPk(updateRoleDto.RLE_ID);
    if (!role) {
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }
    role = await role.update(updateRoleDto)
    return role;
  }

  async deleteOne(idRole: number) {
    return this.rolesRepository.destroy({
      where: { RLE_ID: idRole },
    });
  }
}
