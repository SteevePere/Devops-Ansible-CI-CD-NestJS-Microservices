import { ApiProperty } from '@nestjs/swagger';


export class CreateRoomTypeDto
{

	@ApiProperty()
	readonly RTE_ID: number;

	@ApiProperty()
	readonly RMT_NAME: string;

	@ApiProperty()
	readonly RMT_MAX_OCCUPANCY: number;
}
