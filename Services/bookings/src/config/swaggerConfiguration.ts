import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfiguration = new DocumentBuilder()
  .setTitle('Booking Microservice')
  .setDescription('A REST API for booking management.')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
