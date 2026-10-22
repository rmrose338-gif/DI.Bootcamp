import bcrypt from 'bcrypt';
import { randomUUID } from 'node:crypto';
import jwt from 'jsonwebtoken';
import { parse as parseCookie } from 'cookie';

const COOKIE_NAME = 'accessToken';
const TOKEN_LIFETIME = '1h';

export const cookieName = COOKIE_NAME;

export function createAuth({ store, secret, isProduction }) {
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    path: '/',
  };

  function issueToken(user) {
    return jwt.sign({ sub: user.id }, secret, { algorithm: 'HS256', expiresIn: TOKEN_LIFETIME });
  }

  function verifyToken(token) {
    try {
      const payload = jwt.verify(token, secret, { algorithms: ['HS256'] });
      return typeof payload === 'object' && typeof payload.sub === 'string' ? payload.sub : null;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) return null;
      throw error;
    }
  }

  function authenticate(request, response, next) {
    const userId = verifyToken(request.cookies?.[COOKIE_NAME]);
    const user = userId ? store.find('users', userId) : null;
    if (!user) {
      response.status(401).json({ error: 'Authentication required.' });
      return;
    }
    request.user = user;
    next();
  }

  function authenticateSocket(socket, next) {
    const token = parseCookie(socket.request.headers.cookie ?? '')[COOKIE_NAME];
    const userId = token ? verifyToken(token) : null;
    const user = userId ? store.find('users', userId) : null;
    if (!user) {
      next(new Error('Authentication required.'));
      return;
    }
    socket.user = user;
    next();
  }

  async function register({ username, email, password, displayName = '' }) {
    if (typeof username !== 'string' || !/^[a-zA-Z0-9_]{3,30}$/.test(username)
      || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      || email.length > 254
      || typeof password !== 'string' || password.length < 12
      || Buffer.byteLength(password, 'utf8') > 72
      || typeof displayName !== 'string' || displayName.length > 80) {
      return { error: 'Username must be 3-30 letters, numbers, or underscores; enter a valid email; password must be 12-72 characters.' };
    }
    if (store.findBy('users', 'usernameKey', username.toLowerCase())
      || store.findBy('users', 'emailKey', email.toLowerCase())) {
      return { conflict: true, error: 'Username or email is already in use.' };
    }
    const user = {
      id: randomUUID(),
      username,
      usernameKey: username.toLowerCase(),
      email,
      emailKey: email.toLowerCase(),
      displayName,
      avatar: '',
      passwordHash: await bcrypt.hash(password, 12),
    };
    await store.insert('users', user);
    return { user };
  }

  async function login({ username, password }) {
    const user = typeof username === 'string' ? store.findBy('users', 'usernameKey', username.toLowerCase()) : null;
    if (!user || typeof password !== 'string' || !await bcrypt.compare(password, user.passwordHash)) {
      return null;
    }
    return user;
  }

  function setCookie(response, user) {
    response.cookie(COOKIE_NAME, issueToken(user), {
      ...cookieOptions,
      maxAge: 60 * 60 * 1000,
    });
  }

  function clearCookie(response) {
    response.clearCookie(COOKIE_NAME, cookieOptions);
  }

  return { authenticate, authenticateSocket, register, login, setCookie, clearCookie };
}

export function publicUser(user) {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    displayName: user.displayName,
    avatar: user.avatar,
  };
}
