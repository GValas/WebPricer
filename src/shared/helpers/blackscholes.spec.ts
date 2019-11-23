import { BlackScholes } from './blackscholes';
import { BlackScholesRequest } from '../interfaces/black-scholes-request.interface';
import { Quote } from '../interfaces/quote.interface';

describe('BlackScholes toolkit', () => {

    let bs: BlackScholes;
    let spot: number;
    let volatility: number;
    let rate: number;
    let timeToMaturity: number;

    beforeAll(() => {
        bs = new BlackScholes();
        spot = 100;
        volatility = 0.3;
        rate = 0.08;
        timeToMaturity = 1;
    });

    it('BS call premium and greeks', () => {

        const input: BlackScholesRequest = {
            spot,
            volatility,
            rate,
            strike: spot,
            timeToMaturity,
        };

        const result: Quote = {
            delta: 0.6615388914695212,
            forward: 108.32870676749586,
            gamma: 0.0010973170992420072,
            price: 15.711311897523917,
            vega: 36.57723664140024,
        };

        expect(bs.priceCall(input)).toStrictEqual(result);

    });

    it('stock diffusion', () => {
        const gen = bs.generatePath(spot, volatility, rate, timeToMaturity / 10);
        expect(gen.next().value).toBe(88.68928822607359);
        expect(gen.next().value).toBe(89.4094027295264);
    });

});
