import { intersectArrays, isEmptyArray, isEmptyIntersection } from './arrays';

describe('Arrays toolkit', () => {

    it('intersectArrays', () => {
        expect(intersectArrays([1, 2, 3], [1, 2, 4])).toEqual([1, 2]);
        expect(intersectArrays([3], [1, 2, 4])).toEqual([]);
    });

    it('isEmptyArray', () => {
        expect(isEmptyArray([1, 2, 3])).toBe(false);
        expect(isEmptyArray([])).toBe(true);
    });

    it('isEmptyIntersection', () => {
        expect(isEmptyIntersection([1, 2, 3], [1, 2, 4])).toBe(false);
        expect(isEmptyIntersection([3], [1, 2, 4])).toBe(true);
    });

});
