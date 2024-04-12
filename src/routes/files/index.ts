import { Elysia, error, t } from 'elysia';
import { getFile } from './get';
import { patchFile } from './patch';
import { putFile } from './put';

import { GAME_ID_REGEX, MAX_FILE_SIZE, MIN_FILE_SIZE } from '@constants';

// Notes: deleteFile not imported for safety reasons

export const filesRoute = new Elysia({ prefix: '/files' }).guard(
  { params: t.Object({ gameId: t.RegExp(GAME_ID_REGEX, { error: error(400).response }) }) },
  app =>
    app
      .onError(({ set, code, error: { message } }) => {
        if (code === 'VALIDATION') {
          switch (message) {
            case 'Bad Request':
              set.status = 400;
              return message;
            default:
              return 'Unprocessable Entity';
          }
        }
      })
      .use(getFile)
      .guard(
        {
          headers: t.Partial(
            t.Object(
              { 'content-length': t.Numeric({ error: error(400).response }) },
              { error: error(400).response }
            )
          ),
          body: t.String({
            minLength: MIN_FILE_SIZE,
            maxLength: MAX_FILE_SIZE,
          }),
        },
        app => app.use(putFile).use(patchFile)
      )
);
