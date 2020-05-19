import { Module } from '@nestjs/common';
import { BookinsServicesController } from './bookins-services.controller';
import { BookinsServicesService } from './bookins-services.service';
import { bookingsServicesProviders } from './bokkings-services.providers';

@Module({
  controllers: [BookinsServicesController],
  providers: [BookinsServicesService, ...bookingsServicesProviders]
})
export class BookinsServicesModule {}
