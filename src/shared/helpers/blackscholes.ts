import { Gaussian } from 'ts-gaussian';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlackScholes {

    callVega(
        forward: number,
        strike: number,
        discountFactor: number,
        volatility: number,
        timeToMaturity: number,
    ): number {
        const sdt = Math.sqrt(timeToMaturity);
        const vt = volatility * sdt;
        const d1 = Math.log(forward / strike) / vt + vt / 2;
        const f1 = this.dist.pdf(d1);
        return f1 * forward * discountFactor * sdt;
    }

    private dist = new Gaussian(0, 1);

    callPrice(
        forward: number,
        strike: number,
        discountFactor: number,
        volatility: number,
        timeToMaturity: number,
    ): number {
        const vt = volatility * Math.sqrt(timeToMaturity);
        const d1 = Math.log(forward / strike) / vt + vt / 2;
        const d2 = d1 - vt;
        const nd1 = this.dist.cdf(d1);
        const nd2 = this.dist.cdf(d2);
        return discountFactor * (forward * nd1 - strike * nd2);
    }

    putPrice(
        forward: number,
        strike: number,
        discountFactor: number,
        volatility: number,
        timeToMaturity: number,
    ): number {
        const vt = volatility * Math.sqrt(timeToMaturity);
        const d1 = Math.log(forward / strike) / vt + vt / 2;
        const d2 = d1 - vt;
        const nd1 = this.dist.cdf(d1);
        const nd2 = this.dist.cdf(d2);
        return discountFactor * (strike * nd2 - forward * nd1);
    }

    callDelta(
        forward: number,
        strike: number,
        discountFactor: number,
        volatility: number,
        timeToMaturity: number,
    ): number {
        const vt = volatility * Math.sqrt(timeToMaturity);
        const d1 = Math.log(forward / strike) / vt + vt / 2;
        const nd1 = this.dist.cdf(d1);
        return nd1;
    }

    callGamma(
        forward: number,
        strike: number,
        discountFactor: number,
        volatility: number,
        timeToMaturity: number,
    ): number {
        const vt = volatility * Math.sqrt(timeToMaturity);
        const d1 = Math.log(forward / strike) / vt + vt / 2;
        const f1 = this.dist.pdf(d1);
        return f1 / (forward * discountFactor / vt);
    }

    * generatePath(spot: number, vol: number, rate: number, dt: number) {
        let s = spot;
        while (true) {
            const e = this.normalRandom();
            s *= Math.exp((rate - vol * vol / 2) * dt + vol * Math.sqrt(dt) * e);
            yield s;
        }
    }

    private normalRandom(): number {
        let u = 0;
        let v = 0;
        while (u === 0) { u = Math.random(); }
        while (v === 0) { v = Math.random(); }
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }

}

// function normalcdf(x: number, mean: number = 0, sigma: number = 1) {
//     const z = (x - mean) / Math.sqrt(2 * sigma * sigma);
//     const t = 1 / (1 + 0.3275911 * Math.abs(z));
//     const a1 = 0.254829592;
//     const a2 = -0.284496736;
//     const a3 = 1.421413741;
//     const a4 = -1.453152027;
//     const a5 = 1.061405429;
//     const erf = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-z * z);
//     const sign = z < 0 ? -1 : 1;
//     return (1 / 2) * (1 + sign * erf);
// }
