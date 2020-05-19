import { ApiProperty } from '@nestjs/swagger';


export class CreateRoomDto
{

	@ApiProperty()
	readonly RMT_ID: number;

	@ApiProperty()
	readonly HTL_ID: number;

	@ApiProperty()
	readonly ROM_NAME: string;
}
