import { ApiProperty } from '@nestjs/swagger';

export class ConfigDto {

    @ApiProperty()
    readonly client_id: string;
   
    @ApiProperty()
    readonly client_secret: string;

    @ApiProperty()
    readonly refresh_token: string;

    @ApiProperty({
        default: 'refresh_token'
    })
    readonly grant_type: string;

}
