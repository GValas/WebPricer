import { priceVanilla, stockDiffusion } from './blackscholes';
import { BlackScholesRequest } from '../interfaces/black-scholes-request.interface';
import { Quote } from '../interfaces/quote.interface';
import { VanillaType } from '../enums/vanilla-type.enum';

describe('BlackScholes toolkit', () => {

    let spot: number;
    let volatility: number;
    let rate: number;
    let timeToMaturity: number;

    beforeAll(() => {
        spot = 100;
        volatility = 0.3;
        rate = 0.08;
        timeToMaturity = 1;
    });

    it('priceVanilla', () => {

        expect(priceVanilla({
            vanillaType: VanillaType.Call,
            spot,
            volatility,
            rate,
            strike: spot,
            timeToMaturity,
        })).toStrictEqual({
            forward: 108.32870676749586,
            price: 15.711311897523917,
            delta: 0.6615388914695212,
            gamma: 0.01219241221380008,
            vega: 36.57723664140024,
            theta: -9.521991676164292,
            rho: 50.4425772494282,
        });

        expect(priceVanilla({
            vanillaType: VanillaType.Put,
            spot,
            volatility,
            rate,
            strike: spot,
            timeToMaturity,
        })).toStrictEqual({
            forward: 108.32870676749586,
            price: 8.022946536187497,
            delta: -0.33846110853047884,
            gamma: 0.01219241221380008,
            vega: 36.57723664140024,
            theta: 2.1370609050712055,
            rho: -41.86905738923538,
        });

    });

    it('stockDiffusion', () => {
        const gen = stockDiffusion(spot, volatility, rate, timeToMaturity / 10);
        expect(gen.next().value).toBe(88.68928822607359);
        expect(gen.next().value).toBe(89.4094027295264);
    });

});
