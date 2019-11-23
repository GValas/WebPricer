import config from '../../server/app/config/config';

const uniform = uniformGenerator();

function* uniformGenerator() {

    // use a fixed seed random generator
    const random = require('random');
    const seedrandom = require('seedrandom');
    random.use(seedrandom(config.randomSeed));

    while (true) {
        yield random.uniform(0, 1);
    }
}

export function randomEnum<T>(anEnum: T): T[keyof T] {
    const values = Object.keys(anEnum);
    const enumKey = values[Math.floor(uniform.next().value() * values.length)];
    return anEnum[enumKey];
}

export function randomDate(start: Date, end: Date): Date {
    const d = new Date(start.getTime() + uniform.next().value() * (end.getTime() - start.getTime()));
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
}

export function randomNumber(start: number, end: number): number {
    return uniform.next().value() * (end - start) + start;
}

export function randomValue<T>(array: T[]): T {
    return array[Math.floor(uniform.next().value() * array.length)];
}
