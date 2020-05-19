import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {

  @ApiProperty()
  readonly RLE_ID: number;

  @ApiProperty()
  readonly RLE_NAME: string;
}
