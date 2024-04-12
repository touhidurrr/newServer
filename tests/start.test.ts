import { expect, test } from 'bun:test';
import { START_TEST_PORT, START_TEST_TIMEOUT } from '@constants';

test(
  'App Start Test',
  async () => {
    const PORT = START_TEST_PORT;
    const proc = Bun.spawn(['bun', 'start'], { env: { PORT } });

    while (true) {
      if (proc.killed) return;
      try {
        const isAlive = await fetch(`http://localhost:${PORT}/isalive`).then(res => res.text());
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