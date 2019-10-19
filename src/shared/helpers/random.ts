export function randomEnum<T>(anEnum: T): T[keyof T] {
    const values = Object.keys(anEnum);
    const enumKey = values[Math.floor(Math.random() * values.length)];
    return anEnum[enumKey];
}

export function randomDate(start: Date, end: Date): Date {
    const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
}

export function randomNumber(start: number, end: number): number {
    return Math.random() * (end - start) + start;
} 
