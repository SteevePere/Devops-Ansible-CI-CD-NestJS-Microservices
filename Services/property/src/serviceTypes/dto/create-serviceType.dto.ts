import { ApiProperty } from '@nestjs/swagger';


export class CreateServiceTypeDto
{

	@ApiProperty()
	readonly RTE_ID: number;

	@ApiProperty()
	readonly SVT_NAME: string;
}
