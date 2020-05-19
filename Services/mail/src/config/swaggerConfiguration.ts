import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfiguration = new DocumentBuilder()
  .setTitle('Mailing Microservice')
  .setDescription('A REST API for mailing.')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
