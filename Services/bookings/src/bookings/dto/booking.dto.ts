import { ApiProperty } from '@nestjs/swagger';

export class BookingDto {

    @ApiProperty({
        example: '2020-03-26'
    })
    readonly BKG_START_DATETIME: string;

    @ApiProperty({
        example: '2020-03-28'
    })
    readonly BKG_END_DATETIME: string;
    
    @ApiProperty({
        description: 'Unique Id',
    })
    readonly BKG_ID: number;

    @ApiProperty()
    readonly USR_ID: number;
}
