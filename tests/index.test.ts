import { app } from '@index';
import { treaty } from '@elysiajs/eden';
import { TEST_GAME_ID } from '@constants';
import { describe, expect, test } from 'bun:test';

const api = treaty(app);

describe('GET /isalive', async () => {
  await api.isalive.get().then(res => {
    expect(res.status).toBe(200);
    expect(res.data).toBe(true);
  });
});

describe('GET /files', () => {
  test('Bad ID', async () => {
    await api
      .files({ gameId: 'bad-id' })
      .get()
      .then(res => {
        expect(res.status).toBe(422);
      });
  });
});

describe('PUT /files', () => {
  test('Small File', async () => {
    await api
      .files({ gameId: TEST_GAME_ID })
      .put('test')
      .then(res => {
        expect(res.status).toBe(422);
      });
  });

  test('Big File', async () => {
    await api
      .files({ gameId: TEST_GAME_ID })
      .put('0'.repeat(1024 * 1024 + 1))
      .then(res => {
        expect(res.status).toBe(422);
      });
  });

  test('Good File', async () => {
    await api
      .files({ gameId: TEST_GAME_ID })
      .put('0'.repeat(20))
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.data).toBe('Done!');
      });
  });

  test('Get Good File', async () => {
    await api
      .files({ gameId: TEST_GAME_ID })
      .get()
      .then(res => {
        expect(res.status).toBe(200);
      });
  });
});
