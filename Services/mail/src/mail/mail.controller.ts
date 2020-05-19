import { UseInterceptors, Controller , Post, Param, Body, InternalServerErrorException, Res, HttpStatus, BadRequestException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { MailService } from './mail.service';
import { MailDto } from './dto/mail.dto';
import { isNullOrUndefined } from 'util';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ConfigDto } from './dto/config.dto';
import { SentryInterceptor } from '../sentry.interceptor';

@UseInterceptors(SentryInterceptor)
@ApiTags('Mailing')
@ApiBearerAuth()
@Roles(1)
@Controller('mail')
export class MailController {

    constructor(private readonly mailService: MailService) { }

    @Post()
	@UseGuards(JwtAuthGuard, RolesGuard)
    sendMail(@Body() mailDto: MailDto) {
        if (isNullOrUndefined(mailDto.dest)) {
            throw new BadRequestException(`No recipients defined`)
        }
        const sendmail = this.mailService.sendMail(mailDto);
        if (sendmail) throw new InternalServerErrorException();
    }

    @ApiResponse({status: 201, description: 'The refresh code has been successfully updated.'})
    @ApiResponse({ status: 500, description: 'Internal ServerError.'})
    @Post('/refresh')
	@UseGuards(JwtAuthGuard, RolesGuard)
    getRefreshToken(@Body() configDto: ConfigDto) {
       return this.mailService.refreshToken(configDto).catch(
           err => {
            throw new InternalServerErrorException()
           }
       );
    }

}
