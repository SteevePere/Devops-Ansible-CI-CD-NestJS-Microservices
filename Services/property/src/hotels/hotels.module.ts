import { Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { hotelsProviders } from './hotels.providers';


@Module({
	controllers: [HotelsController],
	providers: [HotelsService, ...hotelsProviders],
})


export class HotelsModule {}
