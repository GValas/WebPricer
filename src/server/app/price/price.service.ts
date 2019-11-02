import { Injectable } from '@nestjs/common';
import { Product } from '../../../shared/models/product.model';
import { Quote } from '../../../shared/models/quote.model';
import { BlackScholes } from '../../../shared/helpers/blackscholes';
import { sleep } from '../../../shared/helpers/async';

@Injectable()
export class PriceService {
    constructor(private readonly bs: BlackScholes) {

    }

    async priceOne(product: Product): Promise<Quote> {

        await sleep(1);

        const spot = 100;
        const rate = 0.08;
        const vol = 0.30;
        const dt = 1;
        const df = Math.exp(-rate * dt);
        const fwd = spot / df;

        return {
            price: this.bs.callPrice(fwd, spot, df, vol, dt),
            delta: this.bs.callDelta(fwd, spot, df, vol, dt),
            gamma: this.bs.callGamma(fwd, spot, df, vol, dt),
            vega: this.bs.callVega(fwd, spot, df, vol, dt),
        };
    }

}
