import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { createApp } from '../src/app.js';

const config = {
  accessTokenSecret: 'test-access-secret-0123456789-abcdefgh',
  refreshTokenSecret: 'test-refresh-secret-0123456789-abcdefg',
  isProduction: false,
};

let server;
let baseUrl;

before(async () => {
  server = createApp({ config }).listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test('registers, protects profile, rotates refresh tokens, and logs out', async () => {
  const registration = await fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      username: 'test_user',
      password: 'correct horse battery staple',
      displayName: 'Test User',
    }),
  });

  assert.equal(registration.status, 201);
  const user = (await registration.json()).user;
  assert.equal(user.username, 'test_user');
  assert.equal('passwordHash' in user, false);
  const registrationCookies = parseCookies(registration.headers.getSetCookie());
  assert.ok(registrationCookies.accessToken);
  assert.ok(registrationCookies.refreshToken);
  assert.match(registration.headers.getSetCookie().join(';'), /HttpOnly/i);
  assert.match(registration.headers.getSetCookie().join(';'), /SameSite=Strict/i);

  const authStatus = await fetch(`${baseUrl}/api/auth/me`, {
    headers: { cookie: cookieHeader(registrationCookies) },
  });
  assert.equal(authStatus.status, 200);
  assert.equal((await authStatus.json()).user.id, user.id);

  const unauthenticated = await fetch(`${baseUrl}/api/profile`);
  assert.equal(unauthenticated.status, 401);

  const profile = await fetch(`${baseUrl}/api/profile`, {
    headers: { cookie: cookieHeader(registrationCookies) },
  });
  assert.equal(profile.status, 200);
  assert.equal((await profile.json()).user.id, user.id);

  const refresh = await fetch(`${baseUrl}/api/auth/refresh`, {
    method: 'POST',
    headers: { cookie: cookieHeader(registrationCookies) },
  });
  assert.equal(refresh.status, 200);
  const refreshedCookies = parseCookies(refresh.headers.getSetCookie());
  assert.ok(refreshedCookies.refreshToken);
  assert.notEqual(refreshedCookies.refreshToken, registrationCookies.refreshToken);

  const reusedToken = await fetch(`${baseUrl}/api/auth/refresh`, {
    method: 'POST',
    headers: { cookie: cookieHeader(registrationCookies) },
  });
  assert.equal(reusedToken.status, 401);

  const logout = await fetch(`${baseUrl}/api/auth/logout`, {
    method: 'POST',
    headers: { cookie: cookieHeader(refreshedCookies) },
  });
  assert.equal(logout.status, 204);

  const loggedOutRefresh = await fetch(`${baseUrl}/api/auth/refresh`, {
    method: 'POST',
    headers: { cookie: cookieHeader(refreshedCookies) },
  });
  assert.equal(loggedOutRefresh.status, 401);
});

test('validates registration and rejects duplicate usernames', async () => {
  const invalid = await fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ username: 'x', password: 'short' }),
  });
  assert.equal(invalid.status, 400);

  const first = await register('duplicate_user');
  assert.equal(first.status, 201);

  const duplicate = await register('duplicate_user');
  assert.equal(duplicate.status, 409);
});

async function register(username) {
  return fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ username, password: 'correct horse battery staple' }),
  });
}

function parseCookies(setCookieHeaders) {
  return Object.fromEntries(setCookieHeaders.map((cookie) => {
    const [nameValue] = cookie.split(';');
    const separator = nameValue.indexOf('=');
    return [nameValue.slice(0, separator), nameValue.slice(separator + 1)];
  }));
}

function cookieHeader(cookies) {
  return Object.entries(cookies)
    .map(([name, value]) => `${name}=${value}`)
    .join('; ');
}
