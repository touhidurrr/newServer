import { treaty } from '@elysiajs/eden';
import { describe, expect, test } from 'bun:test';
import app from '../src';

const api = treaty(app);

describe('GET /isalive', async () => {
  await api.isalive.get().then(res => {
    expect(res.status).toBe(200);
    expect(res.data).toBe(true);
  });
});

const testId = '00000000-0000-0000-0000-000000000000';

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
      .files({ gameId: testId })
      .put('test')
      .then(res => {
        expect(res.status).toBe(422);
      });
  });

  test('Big File', async () => {
    await api
      .files({ gameId: testId })
      .put('0'.repeat(1024 * 1024 + 1))
      .then(res => {
        expect(res.status).toBe(422);
      });
  });

  test('Good File', async () => {
    await api
      .files({ gameId: testId })
      .put('0'.repeat(20))
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.data).toBe('Done!');
      });
  });

  test('Get Good File', async () => {
    await api
      .files({ gameId: testId })
      .get()
      .then(res => {
        expect(res.status).toBe(200);
      });
  });
});
