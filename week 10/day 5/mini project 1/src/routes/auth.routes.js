import { Router } from 'express';
import bcrypt from 'bcrypt';
import {
  authCookieOptions,
  issueTokens,
  revokeRefreshToken,
  verifyAndRotateRefreshToken,
} from '../auth.js';

const PASSWORD_HASH_ROUNDS = 12;
const USERNAME_PATTERN = /^[a-zA-Z0-9_]{3,30}$/;

export function createAuthRouter({ config, userStore, authenticate }) {
  const router = Router();
  const cookieOptions = authCookieOptions(config);

  router.get('/me', authenticate, (request, response) => {
    response.json({ user: publicUser(request.authenticatedUser) });
  });

  router.post('/register', async (request, response) => {
    const { username, password, displayName = '' } = request.body ?? {};
    if (typeof username !== 'string'
      || !USERNAME_PATTERN.test(username)
      || typeof password !== 'string'
      || password.length < 12
      || Buffer.byteLength(password, 'utf8') > 72
      || typeof displayName !== 'string'
      || displayName.length > 80) {
      response.status(400).json({
        error: 'Username must be 3-30 letters, numbers, or underscores; password must be 12-72 characters.',
      });
      return;
    }

    const passwordHash = await bcrypt.hash(password, PASSWORD_HASH_ROUNDS);
    const user = userStore.createUser({ username, passwordHash, displayName });
    if (!user) {
      response.status(409).json({ error: 'Username is already in use.' });
      return;
    }

    setAuthCookies(response, issueTokens(user, { config, userStore }), cookieOptions);
    response.status(201).json({ user: publicUser(user) });
  });

  router.post('/login', async (request, response) => {
    const { username, password } = request.body ?? {};
    if (typeof username !== 'string' || typeof password !== 'string') {
      response.status(400).json({ error: 'Username and password are required.' });
      return;
    }

    const user = userStore.findUserByUsername(username);
    const passwordMatches = user
      ? await bcrypt.compare(password, user.passwordHash)
      : false;
    if (!user || !passwordMatches) {
      response.status(401).json({ error: 'Invalid username or password.' });
      return;
    }

    setAuthCookies(response, issueTokens(user, { config, userStore }), cookieOptions);
    response.json({ user: publicUser(user) });
  });

  router.post('/refresh', (request, response) => {
    const result = verifyAndRotateRefreshToken(request.cookies.refreshToken, {
      config,
      userStore,
    });
    if (!result) {
      clearAuthCookies(response, cookieOptions);
      response.status(401).json({ error: 'A valid refresh token is required.' });
      return;
    }

    setAuthCookies(response, result.tokens, cookieOptions);
    response.json({ user: publicUser(result.user) });
  });

  router.post('/logout', (request, response) => {
    revokeRefreshToken(request.cookies.refreshToken, { config, userStore });
    clearAuthCookies(response, cookieOptions);
    response.status(204).end();
  });

  return router;
}

export function publicUser(user) {
  return {
    id: user.id,
    username: user.username,
    displayName: user.displayName,
  };
}

function setAuthCookies(response, tokens, cookieOptions) {
  response.cookie('accessToken', tokens.accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });
  response.cookie('refreshToken', tokens.refreshToken, {
    ...cookieOptions,
    maxAge: Math.max(0, tokens.refreshExpiresAt - Date.now()),
  });
}

function clearAuthCookies(response, cookieOptions) {
  response.clearCookie('accessToken', cookieOptions);
  response.clearCookie('refreshToken', cookieOptions);
}
