import { Router } from 'express';
import { publicUser } from './auth.routes.js';

export function createProfileRouter({ userStore }) {
  const router = Router();

  router.get('/', (request, response) => {
    response.json({ user: publicUser(request.authenticatedUser) });
  });

  router.patch('/', (request, response) => {
    const { username, displayName } = request.body ?? {};
    if (username === undefined && displayName === undefined) {
      response.status(400).json({ error: 'Provide a username or display name to update.' });
      return;
    }

    if (username !== undefined
      && (typeof username !== 'string' || !/^[a-zA-Z0-9_]{3,30}$/.test(username))) {
      response.status(400).json({
        error: 'Username must be 3-30 letters, numbers, or underscores.',
      });
      return;
    }

    if (displayName !== undefined
      && (typeof displayName !== 'string' || displayName.length > 80)) {
      response.status(400).json({ error: 'Display name must be 80 characters or fewer.' });
      return;
    }

    const user = userStore.updateUser(request.authenticatedUser.id, {
      ...(username === undefined ? {} : { username }),
      ...(displayName === undefined ? {} : { displayName }),
    });
    if (!user) {
      response.status(409).json({ error: 'Username is already in use.' });
      return;
    }

    response.json({ user: publicUser(user) });
  });

  return router;
}
