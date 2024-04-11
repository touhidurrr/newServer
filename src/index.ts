import { Elysia } from 'elysia';
import { staticPlugin } from '@elysiajs/static';
import { filesRoute } from '@routes/files';
import { infoPlugin } from '@routes/info';

const port = process.env.PORT ?? 3000;
const hostname = process.env.HOST ?? '0.0.0.0';

const app = new Elysia()
  .onRequest(({ request }) => {
    console.info(`${request.method} ${request.url}`);
  })
  .use(staticPlugin({ prefix: '/' }))
  .use(infoPlugin)
  .get('/isalive', true)
  .use(filesRoute)
  .listen({ port, hostname });

console.log(`Server started at ${app.server?.url}`);

export default app;
