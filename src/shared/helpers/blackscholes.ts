import { Gaussian } from 'ts-gaussian';
import { Injectable } from '@nestjs/common';

export interface BlackScholesRequest {
    spot: number;
    strike: number;
    volatility: number;
    rate: number;
    timeToMaturity: number;
}

export interface BlackScholesQuote {
    forward: number;
    price: number;
    delta: number;
    gamma: number;
    vega: number;
}

@Injectable()
export class BlackScholes {

    private dist = new Gaussian(0, 1);

    call(bsRequest: BlackScholesRequest): BlackScholesQuote {

        const k = bsRequest.strike;
        const dt = bsRequest.timeToMaturity;
        const v = bsRequest.volatility;
        const df = Math.exp(- bsRequest.rate * bsRequest.timeToMaturity);
        const fwd = bsRequest.spot / df;

        return {
            forward: fwd,
            price: this.callPrice(fwd, k, df, v, dt),
            delta: this.callDelta(fwd, k, df, v, dt),
            gamma: this.callGamma(fwd, k, df, v, dt),
            vega: this.callVega(fwd, k, df, v, dt),
        }
    }

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
        const nd1 = this.dist.cdf(-d1);
        const nd2 = this.dist.cdf(-d2);
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