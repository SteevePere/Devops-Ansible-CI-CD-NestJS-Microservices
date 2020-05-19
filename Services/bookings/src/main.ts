import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';
import { WinstonModule } from 'nest-winston';
import { loggerConfiguration } from './config/loggerConfiguration';
import { swaggerConfiguration } from './config/swaggerConfiguration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(loggerConfiguration),
  });
  Sentry.init({
    dsn: 'http://c818d64fa89c448faa948642842fb96d@172.16.229.6:9001/2',
  });
	app.setGlobalPrefix('/services/bookings/api/v1');
  const document = SwaggerModule.createDocument(app, swaggerConfiguration);
  SwaggerModule.setup('/', app, document);
  app.setGlobalPrefix('/api/v1');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
