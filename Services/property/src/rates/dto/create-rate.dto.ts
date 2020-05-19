import { ApiProperty } from '@nestjs/swagger';


export class CreateRateDto
{
	
	@ApiProperty()
	readonly RTE_AMOUNT: number;
}
