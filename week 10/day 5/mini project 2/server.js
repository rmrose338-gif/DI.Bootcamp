import 'dotenv/config';
import { createApp } from './src/app.js';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
if (typeof accessTokenSecret !== 'string'
  || accessTokenSecret.length < 32
  || accessTokenSecret.startsWith('replace-with-')) {
  throw new Error('Set ACCESS_TOKEN_SECRET to a random value of at least 32 characters.');
}

const port = Number(process.env.PORT ?? 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535.');
}

const { server } = await createApp({
  accessTokenSecret,
  isProduction: process.env.NODE_ENV === 'production',
  dataFile: process.env.DATA_FILE ?? './data/stories.json',
});

server.listen(port, () => {
  console.log(`Mini project 2 listening on http://localhost:${port}`);
});
