import 'dotenv/config';
import { createApp } from './src/app.js';
import { loadConfig } from './src/config.js';

const config = loadConfig(process.env);
const app = createApp({ config });

app.listen(config.port, () => {
  console.log(`JWT auth API listening on port ${config.port}`);
});
