import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {

  @ApiProperty()
  readonly USR_ID: number;

  @ApiProperty()
  readonly RLE_ID: number;

  @ApiProperty()
  readonly USR_EMAIL: string;

  @ApiProperty()
  readonly USR_PASSWORD: string;

  @ApiProperty()
  readonly USR_ACTIVE: boolean;
}
