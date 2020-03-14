import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CurrencyModule } from '../marketdata/currencies/currency.module'
import { UnderlyingModule } from '../marketdata/underlyings/underlying.module'
import { ProductController } from './product.controller'
import { ProductSchema } from './product.schema'
import { ProductService } from './product.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    CurrencyModule,
    UnderlyingModule,
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule { }
