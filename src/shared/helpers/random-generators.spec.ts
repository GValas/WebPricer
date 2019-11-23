import { randomNumber, randomEnum, randomDate, randomValue } from './random-generators';
import { VanillaType } from '../enums/vanilla-type.enum';

describe('Random generators', () => {

    it('randomNumber', () => {
        expect(randomNumber(10, 20))
            .toBe(13.81404047119474);
    });

    it('randomDate', () => {
        expect(randomDate(new Date(2022, 0, 1), new Date(2020, 0, 1)).toISOString())
            .toBe('2021-07-22T22:00:00.000Z');
    });

    it.each([VanillaType.Call, VanillaType.Put, VanillaType.Put, VanillaType.Call])(
        'randomEnum', (result) => {
            expect(randomEnum(VanillaType)).
                toBe(result);
        },
    );

    it('randomEnum', () => {
        expect(randomValue([1, 2, 3]))
            .toBe(2);
    });
});
