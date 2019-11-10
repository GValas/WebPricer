import { Injectable } from '@nestjs/common';
import { Product } from '../../../shared/interfaces/product.interface';
import { Quote } from '../../../shared/interfaces/quote.interface';
import { BlackScholes } from '../../../shared/helpers/blackscholes';
import { sleep } from '../../../shared/helpers/async';

@Injectable()
export class PriceService {
    constructor(private readonly bs: BlackScholes) {

    }

    async priceOne(product: Product) {

        await sleep(1);

        const spot = 100;
        const rate = 0.08;
        const vol = 0.30;
        const dt = 1;
        const df = Math.exp(-rate * dt);
        const fwd = spot / df;
        const quote: Quote = {
            forward: fwd,
            price: this.bs.callPrice(fwd, spot, df, vol, dt),
            delta: this.bs.callDelta(fwd, spot, df, vol, dt),
            gamma: this.bs.callGamma(fwd, spot, df, vol, dt),
            vega: this.bs.callVega(fwd, spot, df, vol, dt),
        };

        return quote;
    }

}
