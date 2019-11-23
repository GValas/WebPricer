import { Gaussian } from 'ts-gaussian';
import { Injectable } from '@nestjs/common';
import { Quote } from '../interfaces/quote.interface';
import config from '../../server/app/config/config';
import { BlackScholesRequest } from '../interfaces/black-scholes-request.interface';

@Injectable()
export class BlackScholes {

    priceCall(bsRequest: BlackScholesRequest): Quote {

        const dist = new Gaussian(0, 1);

        const strike = bsRequest.strike;
        const timeToMaturity = bsRequest.timeToMaturity;
        const volatility = bsRequest.volatility;
        const discountFactor = Math.exp(- bsRequest.rate * bsRequest.timeToMaturity);
        const forward = bsRequest.spot / discountFactor;

        const sdt = Math.sqrt(timeToMaturity);
        const vt = volatility * sdt;
        const d1 = Math.log(forward / strike) / vt + vt / 2;
        const d2 = d1 - vt;
        const nd1 = dist.cdf(d1);
        const nd2 = dist.cdf(d2);
        const f1 = dist.pdf(d1);

        const call = discountFactor * (forward * nd1 - strike * nd2);
        const put = call - discountFactor * (forward - strike);

        return {
            forward,
            price: call,
            delta: nd1,
            gamma: f1 / (forward * discountFactor / vt),
            vega: f1 * forward * discountFactor * sdt,
        };
    }

    * generatePath(spot: number, vol: number, rate: number, dt: number) {

        // use a fixed seed random generator
        const random = require('random');
        const seedrandom = require('seedrandom');
        random.use(seedrandom(config.randomSeed));

        const norm = random.normal(0, 1);
        let s = spot;

        while (true) {
            s *= Math.exp((rate - vol * vol / 2) * dt + vol * Math.sqrt(dt) * norm());
            yield s;
        }
    }

}
