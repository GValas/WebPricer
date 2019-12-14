import { Module } from '@nestjs/common';
import { PriceService as PriceService } from './price.service';
import { PriceController as PriceController } from './price.controller';
import { ProductModule } from '../products/product.module';

@Module({
  imports: [ProductModule],
  providers: [PriceService],
  controllers: [PriceController],
})
export class PriceModule { }
