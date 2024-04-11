import { Elysia } from 'elysia';
import { staticPlugin } from '@elysiajs/static';
import { filesRoute } from '@routes/files';

const port = process.env.PORT ?? 3000;
const hostname = process.env.HOST ?? '0.0.0.0';

const app = new Elysia()
  .onRequest(({ request }) => {
    console.info(`${request.method} ${request.url}`);
  })
  .use(staticPlugin({ prefix: '/' }))
  .get('/isalive', true)
  .use(filesRoute)
  .listen({ port, hostname });

console.log(`Server started at ${app.server?.url}`);
