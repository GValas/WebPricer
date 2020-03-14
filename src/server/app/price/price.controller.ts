import { Controller, Get, Param } from '@nestjs/common'
import { ProductService } from '../products/product.service'
import { PriceService } from './price.service'

@Controller('prices')
export class PriceController {

    constructor(
        private readonly priceService: PriceService,
        private readonly productService: ProductService,
    ) { }

    @Get(':id')
    async priceOne(@Param('id') id: string) {
        const product = await this.productService.findById(id)
        product.quote = await this.priceService.priceOne(product)
        await this.productService.updateById(id, product)
        return product
    }

    @Get()
    async priceAll() {
        const products = await this.productService.findAll()
        return await Promise.all(
            products.map(async (product) => {
                product.quote = await this.priceService.priceOne(product)
                return await this.productService.updateById(product.id, product)
            }),
        )
    }
}
