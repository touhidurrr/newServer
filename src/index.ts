import { Elysia } from 'elysia';
import { staticPlugin } from '@elysiajs/static';
import { filesRoute } from '@routes/files';
import { infoPlugin } from '@routes/info';
import { DEFAULT_HOST, DEFAULT_PORT } from '@constants';

const port = process.env.PORT ?? DEFAULT_PORT;
const hostname = process.env.HOST ?? DEFAULT_HOST;

export const app = new Elysia()
  .onRequest(({ request }) => {
    console.info(`${request.method} ${request.url}`);
  })
  .use(staticPlugin({ prefix: '/' }))
  .use(infoPlugin)
  .get('/isalive', true)
  .use(filesRoute)
  .listen({ port, hostname });

console.log(`Server started at ${app.server?.url}`);
