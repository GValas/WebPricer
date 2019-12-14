import { sleep } from './async';

describe('Async toolkit', () => {

    it('sleep', async () => {

        const ms = 100;
        const t0 = new Date().getTime();
        await sleep(ms);
        const elapsedTime = new Date().getTime() - t0;

        expect(elapsedTime).toBeGreaterThan(ms - 5);
        expect(elapsedTime).toBeLessThan(ms + 5);

    });

});
