import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { canView, toPublicStory } from '../story-utils.js';

export function createStoriesRouter({ store, io, publicUser }) {
  const router = Router();

  router.get('/stories', (request, response) => {
    response.json({
      stories: store.all('stories')
        .filter((story) => canView(story, request.user.id))
        .map(toPublicStory),
    });
  });

  router.post('/stories', async (request, response) => {
    const { title, content = '' } = request.body ?? {};
    if (!validStory(title, content)) {
      response.status(400).json({ error: 'Enter a title (1-160 characters) and content (up to 100,000 characters).' });
      return;
    }
    const story = {
      id: randomUUID(),
      title: title.trim(),
      content,
      authorId: request.user.id,
      contributorIds: [request.user.id],
      commentsEnabled: true,
      updatedAt: new Date().toISOString(),
    };
    await store.insert('stories', story);
    response.status(201).json({ story: toPublicStory(story) });
  });

  router.get('/stories/:storyId', (request, response) => {
    const story = store.find('stories', request.params.storyId);
    if (!story || !canView(story, request.user.id)) {
      response.status(404).json({ error: 'Story not found.' });
      return;
    }
    response.json({ story: toPublicStory(story) });
  });

  router.put('/stories/:storyId', async (request, response) => {
    const story = store.find('stories', request.params.storyId);
    if (!story || !story.contributorIds.includes(request.user.id)) {
      response.status(404).json({ error: 'Story not found or access denied.' });
      return;
    }
    const { title, content } = request.body ?? {};
    if (!validStory(title, content)) {
      response.status(400).json({ error: 'Enter a title (1-160 characters) and content (up to 100,000 characters).' });
      return;
    }
    await createVersion(store, story);
    story.title = title.trim();
    story.content = content;
    story.updatedAt = new Date().toISOString();
    await store.save();
    const updated = toPublicStory(story);
    io.to(`story:${story.id}`).emit('story:updated', {
      story: updated,
      editor: publicUser(request.user),
    });
    response.json({ story: updated });
  });

  router.patch('/stories/:storyId/settings', async (request, response) => {
    const story = store.find('stories', request.params.storyId);
    if (!story || story.authorId !== request.user.id) {
      response.status(404).json({ error: 'Story not found or access denied.' });
      return;
    }
    if (typeof request.body?.commentsEnabled !== 'boolean') {
      response.status(400).json({ error: 'commentsEnabled must be a boolean.' });
      return;
    }
    story.commentsEnabled = request.body.commentsEnabled;
    await store.save();
    response.json({ story: toPublicStory(story) });
  });

  router.put('/stories/:storyId/contributors', async (request, response) => {
    const story = store.find('stories', request.params.storyId);
    if (!story || story.authorId !== request.user.id) {
      response.status(404).json({ error: 'Story not found or access denied.' });
      return;
    }
    const usernames = request.body?.usernames;
    if (!Array.isArray(usernames) || usernames.length > 50
      || usernames.some((username) => typeof username !== 'string')) {
      response.status(400).json({ error: 'usernames must be an array of up to 50 usernames.' });
      return;
    }
    const contributors = usernames.map((username) => store.findBy('users', 'usernameKey', username.toLowerCase()));
    if (contributors.some((user) => !user)) {
      response.status(400).json({ error: 'One or more usernames do not exist.' });
      return;
    }
    story.contributorIds = [...new Set([story.authorId, ...contributors.map((user) => user.id)])];
    await store.save();
    response.json({ story: toPublicStory(story) });
  });

  router.get('/stories/:storyId/contributors', (request, response) => {
    const story = store.find('stories', request.params.storyId);
    if (!story || !canView(story, request.user.id)) {
      response.status(404).json({ error: 'Story not found or access denied.' });
      return;
    }
    response.json({
      contributors: story.contributorIds.map((userId) => publicUser(store.find('users', userId))),
    });
  });

  router.get('/comments/:storyId', (request, response) => {
    const story = store.find('stories', request.params.storyId);
    if (!story || !canView(story, request.user.id)) {
      response.status(404).json({ error: 'Story not found.' });
      return;
    }
    const comments = store.all('comments')
      .filter((comment) => comment.storyId === story.id)
      .map((comment) => ({
        ...comment,
        author: publicUser(store.find('users', comment.userId)),
      }));
    response.json({ comments });
  });

  router.post('/comments', async (request, response) => {
    const { story_id: storyId, comment_text: commentText } = request.body ?? {};
    const story = typeof storyId === 'string' ? store.find('stories', storyId) : null;
    if (!story || !canView(story, request.user.id)) {
      response.status(404).json({ error: 'Story not found.' });
      return;
    }
    if (!story.commentsEnabled) {
      response.status(403).json({ error: 'Comments are disabled for this story.' });
      return;
    }
    if (typeof commentText !== 'string' || !commentText.trim() || commentText.length > 5000) {
      response.status(400).json({ error: 'Comment must contain 1-5,000 characters.' });
      return;
    }
    const comment = {
      id: randomUUID(),
      storyId,
      userId: request.user.id,
      commentText: commentText.trim(),
      timestamp: new Date().toISOString(),
      reactions: {},
    };
    await store.insert('comments', comment);
    const result = { ...comment, author: publicUser(request.user) };
    io.to(`story:${story.id}`).emit('comment:created', result);
    response.status(201).json({ comment: result });
  });

  router.patch('/comments/:id', async (request, response) => {
    const comment = store.find('comments', request.params.id);
    if (!comment || comment.userId !== request.user.id) {
      response.status(404).json({ error: 'Comment not found or access denied.' });
      return;
    }
    const { comment_text: commentText } = request.body ?? {};
    if (typeof commentText !== 'string' || !commentText.trim() || commentText.length > 5000) {
      response.status(400).json({ error: 'Comment must contain 1-5,000 characters.' });
      return;
    }
    comment.commentText = commentText.trim();
    await store.save();
    io.to(`story:${comment.storyId}`).emit('comment:updated', comment);
    response.json({ comment });
  });

  router.delete('/comments/:id', async (request, response) => {
    const comment = store.find('comments', request.params.id);
    const story = comment ? store.find('stories', comment.storyId) : null;
    if (!comment || (comment.userId !== request.user.id && story?.authorId !== request.user.id)) {
      response.status(404).json({ error: 'Comment not found or access denied.' });
      return;
    }
    await store.remove('comments', comment.id);
    io.to(`story:${comment.storyId}`).emit('comment:deleted', { id: comment.id });
    response.status(204).end();
  });

  router.post('/comments/:id/reactions', async (request, response) => {
    const comment = store.find('comments', request.params.id);
    const { emoji } = request.body ?? {};
    if (!comment) {
      response.status(404).json({ error: 'Comment not found.' });
      return;
    }
    const story = store.find('stories', comment.storyId);
    if (!story || !canView(story, request.user.id)) {
      response.status(404).json({ error: 'Comment not found.' });
      return;
    }
    if (typeof emoji !== 'string' || !['❤️', '👍', '😂', '🎉'].includes(emoji)) {
      response.status(400).json({ error: 'Choose a supported reaction.' });
      return;
    }
    const users = new Set(comment.reactions[emoji] ?? []);
    if (users.has(request.user.id)) users.delete(request.user.id);
    else users.add(request.user.id);
    if (users.size) comment.reactions[emoji] = [...users];
    else delete comment.reactions[emoji];
    await store.save();
    const update = { id: comment.id, reactions: comment.reactions };
    io.to(`story:${comment.storyId}`).emit('comment:reactions', update);
    response.json(update);
  });

  router.get('/stories/:storyId/versions', (request, response) => {
    const story = store.find('stories', request.params.storyId);
    if (!story || story.authorId !== request.user.id) {
      response.status(404).json({ error: 'Story not found or access denied.' });
      return;
    }
    response.json({
      versions: store.all('versions')
        .filter((version) => version.storyId === story.id)
        .sort((left, right) => right.timestamp.localeCompare(left.timestamp)),
    });
  });

  router.post('/stories/:storyId/versions/:versionId/restore', async (request, response) => {
    const story = store.find('stories', request.params.storyId);
    if (!story || story.authorId !== request.user.id) {
      response.status(404).json({ error: 'Story not found or access denied.' });
      return;
    }
    const version = store.find('versions', request.params.versionId);
    if (!version || version.storyId !== story.id) {
      response.status(404).json({ error: 'Version not found.' });
      return;
    }
    await createVersion(store, story);
    story.title = version.title;
    story.content = version.content;
    story.updatedAt = new Date().toISOString();
    await store.save();
    const updated = toPublicStory(story);
    io.to(`story:${story.id}`).emit('story:updated', { story: updated, editor: publicUser(request.user) });
    response.json({ story: updated });
  });

  return router;
}

async function createVersion(store, story) {
  await store.insert('versions', {
    id: randomUUID(),
    storyId: story.id,
    title: story.title,
    content: story.content,
    timestamp: new Date().toISOString(),
  });
}

function validStory(title, content) {
  return typeof title === 'string' && title.trim().length >= 1 && title.length <= 160
    && typeof content === 'string' && content.length <= 100_000;
}
