import { Controller, Get, Param } from '@nestjs/common';
import { PriceService } from './price.service';
import { ProductService } from '../product/product.service';

@Controller('prices')
export class PriceController {

    constructor(
        private readonly priceService: PriceService,
        private readonly productService: ProductService,
    ) { }

    @Get(':id')
    async priceOne(@Param('id') id: string) {
        const product = await this.productService.getById(id);
        product.quote = await this.priceService.priceOne(product);
        await this.productService.updateById(id, product);
        return product;
    }

    @Get()
    async priceAll() {
        const products = await this.productService.getAll();
        for (const product of products) {
            product.quote = await this.priceService.priceOne(product);
            await this.productService.updateById(product.id, product);
        }
        return products;
    }
}
