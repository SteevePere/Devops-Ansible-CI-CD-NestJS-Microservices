import { ApiProperty } from '@nestjs/swagger';


export class UpdateRateDto
{

	@ApiProperty()
	readonly RTE_ID: number;

	@ApiProperty()
	readonly RTE_AMOUNT: number;
}
