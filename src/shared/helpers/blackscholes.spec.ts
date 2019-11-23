import { BlackScholes, BlackScholesRequest, BlackScholesQuote } from './blackscholes';

const bs: BlackScholes = new BlackScholes();

describe('Movies API', () => {
    it('should create a new movie', () => {



        expect(bs.call({
            spot: 100,
            volatility: 0.3,
            rate: 0.08,
            strike: 100,
            timeToMaturity: 1,
        })).toStrictEqual({
            delta: 0.6615388914695212,
            forward: 108.32870676749586,
            gamma: 0.0010973170992420072,
            price: 15.711311897523917,
            vega: 36.57723664140024,
        });

    });
})
