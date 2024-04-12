import { Elysia } from 'elysia';
import { staticPlugin } from '@elysiajs/static';
import { filesRoute } from '@routes/files';
import { infoPlugin } from '@routes/info';
import { DEFAULT_HOST, DEFAULT_PORT, MAX_REQUEST_BODY_SIZE } from '@constants';

const port = process.env.PORT ?? DEFAULT_PORT;
const hostname = process.env.HOST ?? DEFAULT_HOST;

export const app = new Elysia()
  .onRequest(({ request, error }) => {
    console.info(`${request.method} ${request.url}`);
    if (request.body !== null) {
      const bodyLength = request.headers.get('content-length');
      if (bodyLength === null) return error(400);
      if (+bodyLength > MAX_REQUEST_BODY_SIZE) return error(413);
    }
  })
  .use(staticPlugin({ prefix: '/' }))
  .use(infoPlugin)
  .get('/isalive', true)
  .use(filesRoute)
  .listen({ port, hostname });

console.log(`Server started at ${app.server?.url}`);
