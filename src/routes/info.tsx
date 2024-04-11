import { Elysia } from 'elysia';
import { html } from '@elysiajs/html';
import { freemem, loadavg, totalmem } from 'os';

export const infoPlugin = new Elysia().use(html()).get('/info', () => (
  <html lang="en">
    <head>
      <title>UncivServer.xyz Info Page</title>
    </head>
    <body>
      <div>
        <label for="mem">Memory Usage:</label>
        <br></br>
        <progress id="mem" value={freemem()} max={totalmem()}></progress>
      </div>
      <div>
        {[1, 5, 15].map((time, i) => (
          <div>
            <label for={`cpu-${i}`}>CPU (last {time} minutes)</label>
            <br></br>
            <progress id={`cpu-${i}`} value={loadavg()[i]} max={100}></progress>
          </div>
        ))}
      </div>
    </body>
  </html>
));
