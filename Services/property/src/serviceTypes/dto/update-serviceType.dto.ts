import { ApiProperty } from '@nestjs/swagger';


export class UpdateServiceTypeDto
{

	@ApiProperty()
	readonly SVT_ID: number;

	@ApiProperty()
	readonly RTE_ID: number;

	@ApiProperty()
	readonly SVT_NAME: string;
}
