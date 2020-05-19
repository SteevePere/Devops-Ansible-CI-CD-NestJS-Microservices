import { Test, TestingModule } from '@nestjs/testing';
import { BookinsServicesController } from './bookins-services.controller';
import { BookinsServicesService } from './bookins-services.service';
import { bookingsServicesProviders } from './bokkings-services.providers';

describe('BookinsServices Controller', () => {
  let controller: BookinsServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookinsServicesService, ...bookingsServicesProviders],
      controllers: [BookinsServicesController],
    }).compile();

    controller = module.get<BookinsServicesController>(BookinsServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
