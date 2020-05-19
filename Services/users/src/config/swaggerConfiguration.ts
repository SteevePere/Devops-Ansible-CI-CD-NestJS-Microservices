import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfiguration = new DocumentBuilder()
  .setTitle('User Microservice')
  .setDescription('A REST API for user management.')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
