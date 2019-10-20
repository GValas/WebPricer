import { Test, TestingModule } from '@nestjs/testing';
import { UnderlyingService } from './underlying.service';

describe('UnderlyingService', () => {
  let service: UnderlyingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnderlyingService],
    }).compile();

    service = module.get<UnderlyingService>(UnderlyingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
