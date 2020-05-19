import { ApiProperty } from '@nestjs/swagger';


export class UpdateServiceDto
{

	@ApiProperty()
	readonly SVC_ID: number;

	@ApiProperty()
	readonly SVT_ID: number;

	@ApiProperty()
	readonly HTL_ID: number;
}
