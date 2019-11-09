export function intersectArrays<T>(a: T[], b: T[]): T[] {
    return a.filter(value => b.includes(value));
}

export function isEmptyArray<T>(array: T[]): boolean {
    return typeof array === 'undefined' || array.length === 0;
}

export function isEmptyIntersection<T>(a: T[], b: T[]): boolean {
    return isEmptyArray(intersectArrays(a, b));
}
