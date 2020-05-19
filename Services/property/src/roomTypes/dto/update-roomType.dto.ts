import { ApiProperty } from '@nestjs/swagger';


export class UpdateRoomTypeDto
{

	@ApiProperty()
	readonly RMT_ID: number;

	@ApiProperty()
	readonly RTE_ID: number;

	@ApiProperty()
	readonly RMT_NAME: string;

	@ApiProperty()
	readonly RMT_MAX_OCCUPANCY: number;
}
