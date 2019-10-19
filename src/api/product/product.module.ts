import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DataRepository } from '../data/data.repository';

@Module({
  providers: [ProductService, DataRepository],
  controllers: [ProductController],
})
export class ProductModule { }
