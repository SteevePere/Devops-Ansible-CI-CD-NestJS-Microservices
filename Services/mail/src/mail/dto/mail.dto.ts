import { ApiProperty } from '@nestjs/swagger';

export class MailDto {
    @ApiProperty()
    readonly message: string;

    @ApiProperty({
        description: 'List of recipes',
        required: true
    })
    readonly dest: Array<string>;
}
