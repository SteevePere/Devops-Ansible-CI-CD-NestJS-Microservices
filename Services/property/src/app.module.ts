import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { RatesModule } from './rates/rates.module';
import { RoomTypesModule } from './roomTypes/roomTypes.module';
import { ServiceTypesModule } from './serviceTypes/serviceTypes.module';
import { HotelsModule } from './hotels/hotels.module';
import { RoomsModule } from './rooms/rooms.module';
import { ServicesModule } from './services/services.module';


@Module({
	imports: [
		DatabaseModule,
		AuthModule,
		HotelsModule,
		RoomsModule,
		ServicesModule,
		RoomTypesModule,
		ServiceTypesModule,
		RatesModule,
	],
	controllers: [AppController],
	providers: [AppService],
})


export class AppModule {}
