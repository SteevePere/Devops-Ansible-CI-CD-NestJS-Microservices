import { Module } from '@nestjs/common';
import { RoomTypesController } from './roomTypes.controller';
import { RoomTypesService } from './roomTypes.service';
import { roomTypesProviders } from './roomTypes.providers';


@Module({
	controllers: [RoomTypesController],
	providers: [RoomTypesService, ...roomTypesProviders],
})


export class RoomTypesModule {}
