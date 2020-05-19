import { ApiProperty } from '@nestjs/swagger';

export class BookingRoomsDto {
    
    @ApiProperty()
    readonly BXR_ID: number;

    @ApiProperty()
    readonly BKG_ID: number;

    @ApiProperty()
    readonly ROM_ID: number;

    @ApiProperty()
    readonly BXR_OCCUPANCY: number;
}