import { ApiProperty } from '@nestjs/swagger';


export class UpdateRoomDto
{

	@ApiProperty()
	readonly ROM_ID: number;

	@ApiProperty()
	readonly RMT_ID: number;

	@ApiProperty()
	readonly HTL_ID: number;

	@ApiProperty()
	readonly ROM_NAME: string;
}
