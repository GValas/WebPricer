import { Gaussian } from 'ts-gaussian';
import { Quote } from '../interfaces/quote.interface';
import config from '../../server/app/config/config';
import { BlackScholesDescription } from '../interfaces/black-scholes-request.interface';
import { VanillaType } from '../enums/vanilla-type.enum';

export function priceVanilla(bsRequest: BlackScholesDescription): Quote {

    const dist = new Gaussian(0, 1);

    const strike = bsRequest.strike;
    const timeToMaturity = bsRequest.timeToMaturity;
    const volatility = bsRequest.volatility;
    const rate = bsRequest.rate;
    const discountFactor = Math.exp(- bsRequest.rate * bsRequest.timeToMaturity);
    const forward = bsRequest.spot / discountFactor;

    const sdt = Math.sqrt(timeToMaturity);
    const vt = volatility * sdt;
    const d1 = Math.log(forward / strike) / vt + vt / 2;
    const d2 = d1 - vt;
    const nd1 = dist.cdf(d1);
    const nd2 = dist.cdf(d2);
    const f1 = dist.pdf(d1);

    return (bsRequest.vanillaType === VanillaType.Call) ?
        {
            forward,
            price: discountFactor * (forward * nd1 - strike * nd2),
            delta: nd1,
            gamma: f1 / (forward * discountFactor * vt),
            vega: f1 * forward * discountFactor * sdt,
            theta: discountFactor * (-forward * f1 * volatility / 2 / sdt - rate * strike * nd2),
            rho: discountFactor * strike * timeToMaturity * nd2,
        } : {
            forward,
            price: discountFactor * (forward * (nd1 - 1) - strike * (nd2 - 1)),
            delta: nd1 - 1,
            gamma: f1 / (forward * discountFactor * vt),
            vega: f1 * forward * discountFactor * sdt,
            theta: discountFactor * (forward * f1 * volatility / 2 / sdt - rate * strike * (1 - nd2)),
            rho: -discountFactor * strike * timeToMaturity * (1 - nd2),
        };

}

export function* stockDiffusion(spot: number, vol: number, rate: number, dt: number) {

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
