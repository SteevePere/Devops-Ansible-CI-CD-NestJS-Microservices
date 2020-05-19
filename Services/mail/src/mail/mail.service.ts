import { Injectable, NotFoundException, BadRequestException, Inject, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotEnv from "dotenv";
import { MailDto } from './dto/mail.dto';
import Axios, * as axios from "axios";


dotEnv.config();
@Injectable()
export class MailService {

    private transporter_: any;
    private credentials: any;

    public constructor() {
        this.transporter_ = nodemailer.createTransport({
            host: process.env.HOST_SMTP,
            port: process.env.PORT_SMTP,
            secure: true,
            auth: {
                type: 'OAuth2',
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
            }
        });
    }

    public sendMail(mailDto: MailDto): Promise<any> {
        return this.transporter_.sendMail({
            from: process.env.FROM,
            to: mailDto.dest,
            subject: process.env.SUBJECT_MAIL,
            text: mailDto.message,
            auth: {
                expires: process.env.EXPIRES,
                user: process.env.USER_MAIL_HOST,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: this.credentials['access_token'],
            }
        }, (err, info) => {
            if (err) throw new InternalServerErrorException();
        });
    }

    public refreshToken(config) {
        return Axios.post(process.env.URL_GET_TOKEN, config).then(
            res => {
                this.credentials = res.data;
                return res.data;
            },
            err => { 
                throw new InternalServerErrorException();
            }
        );
    }
}
