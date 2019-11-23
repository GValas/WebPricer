import { Injectable } from '@nestjs/common';
import { Product } from '../../../shared/interfaces/product.interface';
import { BlackScholes } from '../../../shared/helpers/blackscholes';
import { sleep } from '../../../shared/helpers/async';
import { Quote } from '../../../shared/interfaces/quote.interface';

@Injectable()
export class PriceService {
    constructor(private readonly bs: BlackScholes) { }

    async priceOne(product: Product): Promise<Quote> {
        await sleep(1);
        return this.bs.priceCall({
            spot: 100,
            volatility: 0.3,
            rate: 0.08,
            strike: 100,
            timeToMaturity: 1,
        });
    }

}
