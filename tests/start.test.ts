import { hostname } from 'node:os';
import { expect, test } from 'bun:test';
import { DEFAULT_PORT, START_TEST_FETCH_TIMEOUT, START_TEST_TIMEOUT } from '@constants';

test(
  'App Start Test',
  async () => {
    const proc = Bun.spawn(['bun', 'start']);
    const url = `http://${hostname()}:${DEFAULT_PORT}/isalive`;

    while (!proc.killed) {
      try {
        const isAlive = await fetch(`http://}:${DEFAULT_PORT}/isalive`, {
          signal: AbortSignal.timeout(START_TEST_FETCH_TIMEOUT),
        }).then(res => res.text());
        if (isAlive) {
          expect(isAlive).toBeString();
          expect(isAlive).toBe('true');
          break;
        }
      } catch {}
    }

    expect(proc.killed).toBe(false);
    proc.kill();
  },
  START_TEST_TIMEOUT
);
