import { randomUUID } from 'node:crypto';
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_LIFETIME_SECONDS = 15 * 60;
const REFRESH_TOKEN_LIFETIME_SECONDS = 7 * 24 * 60 * 60;

export const authCookieOptions = (config) => ({
  httpOnly: true,
  secure: config.isProduction,
  sameSite: 'strict',
  path: '/',
});

export function issueTokens(user, { config, userStore }) {
  const now = Date.now();
  const refreshExpiresAt = now + REFRESH_TOKEN_LIFETIME_SECONDS * 1000;
  const sessionId = userStore.createRefreshSession(user.id, refreshExpiresAt);

  return {
    accessToken: jwt.sign(
      { sub: user.id },
      config.accessTokenSecret,
      { algorithm: 'HS256', expiresIn: ACCESS_TOKEN_LIFETIME_SECONDS },
    ),
    refreshToken: jwt.sign(
      { sub: user.id, sid: sessionId, jti: randomUUID() },
      config.refreshTokenSecret,
      { algorithm: 'HS256', expiresIn: REFRESH_TOKEN_LIFETIME_SECONDS },
    ),
    refreshExpiresAt,
  };
}

export function verifyAccessToken(token, secret) {
  try {
    const payload = jwt.verify(token, secret, { algorithms: ['HS256'] });
    return typeof payload === 'object' && typeof payload.sub === 'string'
      ? payload.sub
      : null;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return null;
    }
    throw error;
  }
}

export function verifyAndRotateRefreshToken(token, { config, userStore }) {
  let payload;
  try {
    payload = jwt.verify(token, config.refreshTokenSecret, { algorithms: ['HS256'] });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return null;
    }
    throw error;
  }

  if (typeof payload !== 'object'
    || typeof payload.sub !== 'string'
    || typeof payload.sid !== 'string') {
    return null;
  }

  const session = userStore.findRefreshSession(payload.sid);
  if (!session || session.userId !== payload.sub || session.expiresAt <= Date.now()) {
    userStore.revokeRefreshSession(payload.sid);
    return null;
  }

  const user = userStore.findUserById(session.userId);
  if (!user) {
    userStore.revokeRefreshSession(payload.sid);
    return null;
  }

  userStore.revokeRefreshSession(payload.sid);
  return { user, tokens: issueTokens(user, { config, userStore }) };
}

export function revokeRefreshToken(token, { config, userStore }) {
  if (!token) {
    return;
  }

  try {
    const payload = jwt.verify(token, config.refreshTokenSecret, {
      algorithms: ['HS256'],
      ignoreExpiration: true,
    });
    if (typeof payload === 'object' && typeof payload.sid === 'string') {
      userStore.revokeRefreshSession(payload.sid);
    }
  } catch (error) {
    if (!(error instanceof jwt.JsonWebTokenError)) {
      throw error;
    }
  }
}
