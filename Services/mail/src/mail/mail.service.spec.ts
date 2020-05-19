import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import * as dotEnv from "dotenv";

dotEnv.config();
describe('MailService', () => {
  let service: MailService;
  let credentials: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailService],
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('MailService - refresh token', async() => {
    const config = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      refresh_token: process.env.REFRESH_TOKEN,
      grant_type: 'refresh_token'

    }
    const result = await service.refreshToken(config);
    credentials = result;
    expect(result['token_type']).toEqual("Bearer");
  })
  
  test('MailService - send mail', async() => {
    const data_message = {
      message:  "test uinitaire",
      dest: ["xyz97600@gmail.com"]
    };
    service['credentials'] = credentials;
    service.sendMail(data_message);
  });
});