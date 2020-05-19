import { ApiProperty } from '@nestjs/swagger';


export class UpdateHotelDto
{

	@ApiProperty()
	readonly HTL_ID: number;

	@ApiProperty()
	readonly HTL_ADDRESS: string;

	@ApiProperty()
	readonly HTL_PHONE_NUMBER: string;
}
