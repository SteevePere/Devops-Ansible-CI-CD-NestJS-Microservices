import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { roomsProviders } from './rooms.providers';


@Module({
	controllers: [RoomsController],
	providers: [RoomsService, ...roomsProviders],
})


export class RoomsModule {}
