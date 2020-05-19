import { ApiProperty } from '@nestjs/swagger';


export class CreateServiceDto
{

	@ApiProperty()
	readonly SVT_ID: number;

	@ApiProperty()
	readonly HTL_ID: number;
}
