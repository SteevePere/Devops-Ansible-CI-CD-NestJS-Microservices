import { ApiProperty } from '@nestjs/swagger';

export class BookingServicesDto {
    @ApiProperty()
    readonly BXS_ID: number;

    @ApiProperty()
    readonly BKG_ID: number;

    @ApiProperty()
    readonly SVC_ID: number;

}