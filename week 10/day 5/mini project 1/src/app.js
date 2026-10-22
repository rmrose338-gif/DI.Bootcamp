import express from 'express';
import cookieParser from 'cookie-parser';
import { createAuthenticateMiddleware } from './middleware/authenticate.js';
import { createAuthRouter } from './routes/auth.routes.js';
import { createProfileRouter } from './routes/profile.routes.js';
import { createUserStore } from './user-store.js';

export function createApp({ config, userStore = createUserStore() }) {
  const app = express();
  const authenticate = createAuthenticateMiddleware({ config, userStore });

  app.disable('x-powered-by');
  app.use(express.json({ limit: '10kb' }));
  app.use(cookieParser());
  app.use('/api/auth', createAuthRouter({ config, userStore, authenticate }));
  app.use('/api/profile', authenticate, createProfileRouter({ userStore }));

  app.use((request, response) => {
    response.status(404).json({ error: 'Route not found.' });
  });

  app.use((error, request, response, next) => {
    if (response.headersSent) {
      next(error);
      return;
    }

    console.error(error);
    if (error.type === 'entity.parse.failed') {
      response.status(400).json({ error: 'Request body must contain valid JSON.' });
      return;
    }
    if (error.type === 'entity.too.large') {
      response.status(413).json({ error: 'Request body is too large.' });
      return;
    }
    response.status(500).json({ error: 'An unexpected server error occurred.' });
  });

  return app;
}
