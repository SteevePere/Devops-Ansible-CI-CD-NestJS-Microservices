import { ApiProperty } from '@nestjs/swagger';


export class CreateHotelDto
{

	@ApiProperty()
	readonly HTL_ADDRESS: string;

	@ApiProperty()
	readonly HTL_PHONE_NUMBER: string;
}
