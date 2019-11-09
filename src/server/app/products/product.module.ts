import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductSchema } from './product.schema';
import { CurrencyModule } from '../marketdata/currencies/currency.module';
import { UnderlyingModule } from '../marketdata/underlyings/underlying.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    CurrencyModule,
    UnderlyingModule,
    UserModule,
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule { }
