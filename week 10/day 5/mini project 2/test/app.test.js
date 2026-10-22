import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { io as createClient } from 'socket.io-client';
import { createApp } from '../src/app.js';
import { createStore } from '../src/store.js';

const config = {
  accessTokenSecret: 'test-access-secret-0123456789-abcdefgh',
};
let application;
let baseUrl;
let owner;
let contributor;
let visitor;
let storyId;

before(async () => {
  application = await createApp({ ...config, store: await createStore() });
  application.server.listen(0);
  await new Promise((resolve) => application.server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${application.server.address().port}`;
  owner = await register('story_owner');
  contributor = await register('story_writer');
  visitor = await register('story_visitor');
});

after(async () => {
  await new Promise((resolve) => application.io.close(resolve));
});

test('registers, creates stories, enforces contributor permissions, and records versions', async () => {
  const createResponse = await request(owner.cookie, '/api/stories', {
    method: 'POST',
    body: { title: 'First draft', content: 'Once upon a time.' },
  });
  assert.equal(createResponse.status, 201);
  storyId = (await createResponse.json()).story.id;

  const unauthenticated = await fetch(`${baseUrl}/api/stories/${storyId}`, { method: 'PUT' });
  assert.equal(unauthenticated.status, 401);

  const forbiddenEdit = await request(visitor.cookie, `/api/stories/${storyId}`, {
    method: 'PUT',
    body: { title: 'No access', content: 'No access' },
  });
  assert.equal(forbiddenEdit.status, 404);

  const addContributor = await request(owner.cookie, `/api/stories/${storyId}/contributors`, {
    method: 'PUT',
    body: { usernames: ['story_writer'] },
  });
  assert.equal(addContributor.status, 200);

  const update = await request(contributor.cookie, `/api/stories/${storyId}`, {
    method: 'PUT',
    body: { title: 'Revised draft', content: 'A new beginning.' },
  });
  assert.equal(update.status, 200);
  assert.equal((await update.json()).story.content, 'A new beginning.');

  const ownerVersions = await request(owner.cookie, `/api/stories/${storyId}/versions`);
  assert.equal(ownerVersions.status, 200);
  const { versions } = await ownerVersions.json();
  assert.equal(versions.length, 1);
  assert.equal(versions[0].title, 'First draft');

  const contributorVersions = await request(contributor.cookie, `/api/stories/${storyId}/versions`);
  assert.equal(contributorVersions.status, 404);

  const restored = await request(owner.cookie, `/api/stories/${storyId}/versions/${versions[0].id}/restore`, {
    method: 'POST',
    body: {},
  });
  assert.equal((await restored.json()).story.title, 'First draft');
});

test('enforces comment permissions, toggles comments, and allows reaction toggling', async () => {
  const created = await request(contributor.cookie, '/api/comments', {
    method: 'POST',
    body: { story_id: storyId, comment_text: 'A useful comment.' },
  });
  assert.equal(created.status, 201);
  const { comment } = await created.json();

  const deniedEdit = await request(visitor.cookie, `/api/comments/${comment.id}`, {
    method: 'PATCH',
    body: { comment_text: 'Changed by someone else.' },
  });
  assert.equal(deniedEdit.status, 404);

  const edit = await request(contributor.cookie, `/api/comments/${comment.id}`, {
    method: 'PATCH',
    body: { comment_text: 'Updated by its author.' },
  });
  assert.equal((await edit.json()).comment.commentText, 'Updated by its author.');

  const reaction = await request(owner.cookie, `/api/comments/${comment.id}/reactions`, {
    method: 'POST',
    body: { emoji: '👍' },
  });
  assert.equal((await reaction.json()).reactions['👍'].length, 1);
  const removedReaction = await request(owner.cookie, `/api/comments/${comment.id}/reactions`, {
    method: 'POST',
    body: { emoji: '👍' },
  });
  assert.deepEqual((await removedReaction.json()).reactions, {});

  const disabled = await request(owner.cookie, `/api/stories/${storyId}/settings`, {
    method: 'PATCH',
    body: { commentsEnabled: false },
  });
  assert.equal(disabled.status, 200);

  const blockedComment = await request(contributor.cookie, '/api/comments', {
    method: 'POST',
    body: { story_id: storyId, comment_text: 'This should be blocked.' },
  });
  assert.equal(blockedComment.status, 403);

  const deletedByStoryOwner = await request(owner.cookie, `/api/comments/${comment.id}`, {
    method: 'DELETE',
  });
  assert.equal(deletedByStoryOwner.status, 204);
});

test('creates publicly readable expiring shares and provides profile data', async () => {
  const created = await request(owner.cookie, `/api/shares/${storyId}`, {
    method: 'POST',
    body: {},
  });
  assert.equal(created.status, 201);
  const links = await created.json();
  assert.match(links.url, /\/share\//);
  assert.match(links.xUrl, /x\.com/);
  assert.match(links.facebookUrl, /facebook\.com/);

  const token = links.url.split('/').at(-1);
  const publicStory = await fetch(`${baseUrl}/api/shares/${token}`);
  assert.equal(publicStory.status, 200);
  assert.equal((await publicStory.json()).story.id, storyId);
  const sharedPage = await fetch(`${baseUrl}/share/${token}`);
  assert.equal(sharedPage.status, 200);
  assert.match(await sharedPage.text(), /Story Studio/);

  const profile = await request(owner.cookie, '/api/profile/story_owner');
  assert.equal(profile.status, 200);
  assert.equal((await profile.json()).storiesCreated.length, 1);

  const avatarUpdate = await request(owner.cookie, '/api/profile', {
    method: 'PATCH',
    body: { displayName: 'Story Author', avatar: 'data:image/png;base64,aGVsbG8=' },
  });
  assert.equal((await avatarUpdate.json()).user.displayName, 'Story Author');
});

test('authenticates WebSockets and only lets contributors edit stories', async () => {
  const unauthorized = createClient(baseUrl, { transports: ['websocket'], forceNew: true });
  await new Promise((resolve) => unauthorized.once('connect_error', resolve));
  unauthorized.close();

  const client = createClient(baseUrl, {
    transports: ['websocket'],
    forceNew: true,
    extraHeaders: { Cookie: contributor.cookie },
  });
  await new Promise((resolve, reject) => {
    client.once('connect', resolve);
    client.once('connect_error', reject);
  });
  const joined = await new Promise((resolve) => client.emit('story:join', storyId, resolve));
  assert.deepEqual(joined, { ok: true });

  const authorClient = createClient(baseUrl, {
    transports: ['websocket'],
    forceNew: true,
    extraHeaders: { Cookie: owner.cookie },
  });
  await new Promise((resolve, reject) => {
    authorClient.once('connect', resolve);
    authorClient.once('connect_error', reject);
  });
  const authorJoined = await new Promise((resolve) => authorClient.emit('story:join', storyId, resolve));
  assert.deepEqual(authorJoined, { ok: true });

  const broadcast = new Promise((resolve) => authorClient.once('story:updated', resolve));
  const saved = await new Promise((resolve) => client.emit('story:edit', {
    storyId,
    title: 'Saved over WebSocket',
    content: 'Live collaborative edit.',
  }, resolve));
  assert.equal(saved.ok, true);
  assert.equal(saved.story.title, 'Saved over WebSocket');
  assert.equal((await broadcast).story.content, 'Live collaborative edit.');
  client.close();
  authorClient.close();

  const nonContributor = createClient(baseUrl, {
    transports: ['websocket'],
    forceNew: true,
    extraHeaders: { Cookie: visitor.cookie },
  });
  await new Promise((resolve, reject) => {
    nonContributor.once('connect', resolve);
    nonContributor.once('connect_error', reject);
  });
  const denied = await new Promise((resolve) => nonContributor.emit('story:edit', {
    storyId,
    title: 'Unauthorized',
    content: 'Not allowed.',
  }, resolve));
  assert.match(denied.error, /contributors/);
  nonContributor.close();
});

test('persists project data between store instances', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'story-studio-'));
  const dataFile = join(directory, 'stories.json');
  try {
    const firstStore = await createStore(dataFile);
    await firstStore.insert('stories', { id: 'persisted-story', title: 'Persistent' });
    const secondStore = await createStore(dataFile);
    assert.equal(secondStore.find('stories', 'persisted-story').title, 'Persistent');
    assert.equal(JSON.parse(await readFile(dataFile, 'utf8')).stories.length, 1);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

async function register(username) {
  const response = await fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      username,
      email: `${username}@example.test`,
      password: 'correct horse battery staple',
    }),
  });
  assert.equal(response.status, 201);
  const cookie = response.headers.getSetCookie()
    .map((value) => value.split(';')[0])
    .find((value) => value.startsWith('accessToken='));
  assert.ok(cookie);
  return { cookie, user: (await response.json()).user };
}

function request(cookie, path, { method = 'GET', body } = {}) {
  return fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      cookie: cookie ?? '',
      ...(body === undefined ? {} : { 'content-type': 'application/json' }),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}
