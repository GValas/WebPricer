import { Module } from '@nestjs/common'
import { ProductModule } from '../products/product.module'
import { PriceController as PriceController } from './price.controller'
import { PriceService as PriceService } from './price.service'

@Module({
  imports: [ProductModule],
  providers: [PriceService],
  controllers: [PriceController],
})
export class PriceModule { }
