import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfiguration = new DocumentBuilder()
  .setTitle('Property Microservice')
  .setDescription('A REST API for property management.')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
