import { db } from '@services/mongodb';
import { cache } from '@services/redis';
import type { Elysia } from 'elysia';

export const deleteFile = (app: Elysia) =>
  app.delete('/:gameId', async ({ params: { gameId } }) => {
    await Promise.all([cache.del(gameId), db.UncivServer.deleteOne({ _id: gameId })]);
    return 'Done!';
  });
