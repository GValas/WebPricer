import { Module } from '@nestjs/common';
import { PriceService as PriceService } from './price.service';
import { PriceController as PriceController } from './price.controller';
import { BlackScholes } from '../../shared/helpers/blackscholes';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [ProductModule],
  providers: [PriceService, BlackScholes],
  controllers: [PriceController],
})
export class PriceModule { }
