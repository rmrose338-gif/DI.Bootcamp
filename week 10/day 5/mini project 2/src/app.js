import express from 'express';
import cookieParser from 'cookie-parser';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { Server as SocketServer } from 'socket.io';
import { createAuth, publicUser } from './auth.js';
import { createStore } from './store.js';
import { createStoriesRouter } from './routes/stories.js';
import { canView, toPublicStory } from './story-utils.js';
import { AvatarUploadError, storeAvatar } from './avatar-storage.js';

const publicDirectory = fileURLToPath(new URL('../public', import.meta.url));

export async function createApp({ accessTokenSecret, isProduction = false, dataFile = null, store: suppliedStore } = {}) {
  if (typeof accessTokenSecret !== 'string' || accessTokenSecret.length < 32) {
    throw new Error('An access-token secret of at least 32 characters is required.');
  }
  const store = suppliedStore ?? await createStore(dataFile);
  const auth = createAuth({ store, secret: accessTokenSecret, isProduction });
  const app = express();
  const server = createServer(app);
  const io = new SocketServer(server);

  app.disable('x-powered-by');
  app.use(express.json({ limit: '3mb' }));
  app.use(cookieParser());
  app.get('/api/health', (request, response) => response.json({ status: 'ok' }));

  app.post('/api/auth/register', async (request, response) => {
    const result = await auth.register(request.body ?? {});
    if (result.error) {
      response.status(result.conflict ? 409 : 400).json({ error: result.error });
      return;
    }
    auth.setCookie(response, result.user);
    response.status(201).json({ user: publicUser(result.user) });
  });

  app.post('/api/auth/login', async (request, response) => {
    const user = await auth.login(request.body ?? {});
    if (!user) {
      response.status(401).json({ error: 'Invalid username or password.' });
      return;
    }
    auth.setCookie(response, user);
    response.json({ user: publicUser(user) });
  });

  app.post('/api/auth/logout', (request, response) => {
    auth.clearCookie(response);
    response.status(204).end();
  });

  app.get('/api/auth/me', auth.authenticate, (request, response) => {
    response.json({ user: publicUser(request.user) });
  });

  app.get('/api/profile/:username', auth.authenticate, (request, response) => {
    const profile = store.findBy('users', 'usernameKey', request.params.username.toLowerCase());
    if (!profile) {
      response.status(404).json({ error: 'Profile not found.' });
      return;
    }
    const created = store.all('stories').filter((story) => story.authorId === profile.id);
    const contributed = store.all('stories').filter((story) => (
      story.authorId !== profile.id && story.contributorIds.includes(profile.id)
    ));
    response.json({
      user: publicUser(profile),
      storiesCreated: created.map((story) => ({ id: story.id, title: story.title })),
      storiesContributedTo: contributed.map((story) => ({ id: story.id, title: story.title })),
    });
  });

  app.patch('/api/profile', auth.authenticate, async (request, response) => {
    const { displayName, avatar } = request.body ?? {};
    if (displayName !== undefined
      && (typeof displayName !== 'string' || displayName.length > 80)) {
      response.status(400).json({ error: 'Display name must be 80 characters or fewer.' });
      return;
    }
    if (avatar !== undefined
      && (typeof avatar !== 'string'
        || (avatar !== '' && !/^data:image\/(?:png|jpeg|webp|gif);base64,[A-Za-z0-9+/]+=*$/.test(avatar))
        || avatar.length > 2_800_000)) {
      response.status(400).json({ error: 'Avatar must be a supported image smaller than 2 MB.' });
      return;
    }
    if (displayName !== undefined) request.user.displayName = displayName;
    if (avatar !== undefined) {
      try {
        request.user.avatar = avatar === '' ? '' : await storeAvatar(avatar);
      } catch (error) {
        if (error instanceof AvatarUploadError) {
          response.status(error.statusCode).json({ error: error.message });
          return;
        }
        throw error;
      }
    }
    await store.save();
    response.json({ user: publicUser(request.user) });
  });

  app.get('/api/shares/:token', (request, response) => {
    const share = store.findBy('shares', 'token', request.params.token);
    if (!share || share.expiresAt <= Date.now()) {
      response.status(404).json({ error: 'Share link is invalid or expired.' });
      return;
    }
    const story = store.find('stories', share.storyId);
    if (!story) {
      response.status(404).json({ error: 'Story not found.' });
      return;
    }
    response.json({ story: { id: story.id, title: story.title, content: story.content } });
  });

  app.use('/api', auth.authenticate, createStoriesRouter({ store, io, publicUser }));

  app.post('/api/shares/:storyId', auth.authenticate, async (request, response) => {
    const story = store.find('stories', request.params.storyId);
    if (!story || !canView(story, request.user.id)) {
      response.status(404).json({ error: 'Story not found.' });
      return;
    }
    const share = {
      id: randomUUID(),
      token: randomUUID(),
      storyId: story.id,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    };
    await store.insert('shares', share);
    const url = `${request.protocol}://${request.get('host')}/share/${share.token}`;
    response.status(201).json({
      url,
      xUrl: `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(story.title)}`,
      facebookUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    });
  });

  app.get('/share/:token', (request, response) => {
    response.sendFile('index.html', { root: publicDirectory }, (error) => {
      if (error) response.status(error.statusCode ?? 500).end();
    });
  });
  app.use(express.static(publicDirectory));

  io.use(auth.authenticateSocket);
  io.on('connection', (socket) => {
    socket.on('story:join', (storyId, acknowledge = () => {}) => {
      const story = store.find('stories', storyId);
      if (!story || !canView(story, socket.user.id)) {
        acknowledge({ error: 'Story not found or access denied.' });
        return;
      }
      socket.join(`story:${storyId}`);
      acknowledge({ ok: true });
    });

    socket.on('story:edit', async (payload, acknowledge = () => {}) => {
      try {
        const story = typeof payload?.storyId === 'string' ? store.find('stories', payload.storyId) : null;
        if (!story || !story.contributorIds.includes(socket.user.id)) {
          acknowledge({ error: 'Only story contributors may edit.' });
          return;
        }
        const { title, content } = payload;
        if (typeof title !== 'string' || title.trim().length < 1 || title.length > 160
          || typeof content !== 'string' || content.length > 100_000) {
          acknowledge({ error: 'Title and content are required and must be within the size limits.' });
          return;
        }
        const version = {
          id: randomUUID(),
          storyId: story.id,
          title: story.title,
          content: story.content,
          timestamp: new Date().toISOString(),
        };
        await store.insert('versions', version);
        story.title = title.trim();
        story.content = content;
        story.updatedAt = new Date().toISOString();
        await store.save();
        const update = { story: toPublicStory(story), editor: publicUser(socket.user) };
        io.to(`story:${story.id}`).emit('story:updated', update);
        acknowledge({ ok: true, story: toPublicStory(story) });
      } catch (error) {
        console.error('Could not save collaborative story edit.', error);
        acknowledge({ error: 'The story could not be saved.' });
      }
    });

    socket.on('story:cursor', (payload) => {
      if (typeof payload?.storyId !== 'string' || !Number.isInteger(payload.position)) return;
      const story = store.find('stories', payload.storyId);
      if (!story || !story.contributorIds.includes(socket.user.id)) return;
      socket.to(`story:${story.id}`).emit('story:cursor', {
        storyId: story.id,
        position: Math.max(0, Math.min(payload.position, 100_000)),
        user: publicUser(socket.user),
      });
    });
  });

  app.use((request, response) => response.status(404).json({ error: 'Route not found.' }));
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
    if (error instanceof AvatarUploadError) {
      response.status(error.statusCode).json({ error: error.message });
      return;
    }
    response.status(500).json({ error: 'An unexpected server error occurred.' });
  });

  return { app, server, io, store };
}
