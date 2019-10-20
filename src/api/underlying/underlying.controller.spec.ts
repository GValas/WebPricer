import { Test, TestingModule } from '@nestjs/testing';
import { UnderlyingController } from './underlying.controller';

describe('Underlying Controller', () => {
  let controller: UnderlyingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnderlyingController],
    }).compile();

    controller = module.get<UnderlyingController>(UnderlyingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
