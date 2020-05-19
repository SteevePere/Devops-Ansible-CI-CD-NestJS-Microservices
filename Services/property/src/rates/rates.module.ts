import { Module } from '@nestjs/common';
import { RatesController } from './rates.controller';
import { RatesService } from './rates.service';
import { ratesProviders } from './rates.providers';


@Module({
	controllers: [RatesController],
	providers: [RatesService, ...ratesProviders],
})


export class RatesModule {}
