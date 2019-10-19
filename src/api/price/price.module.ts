import { Module } from '@nestjs/common';
import { PriceService as PriceService } from './price.service';
import { PriceController as PriceController } from './price.controller';
import { ProductService } from '../product/product.service';
import { DataRepository } from '../data/data.repository';
import { BlackScholes } from '../../shared/helpers/blackscholes';

@Module({
  providers: [PriceService, ProductService, DataRepository, BlackScholes],
  controllers: [PriceController],
})
export class PriceModule { }
