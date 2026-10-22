const root = document.querySelector('#app');
const toast = document.querySelector('#toast');
const state = {
  user: null,
  stories: [],
  story: null,
  comments: [],
  versions: [],
  shareLinks: null,
  socket: null,
  cursors: new Map(),
  page: 'stories',
  profileData: null,
};

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

function showToast(message, isError = false) {
  toast.textContent = message;
  toast.className = `toast show${isError ? ' error' : ''}`;
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => { toast.className = 'toast'; }, 3400);
}

function askText(title, initialValue = '', { multiline = false, allowEmpty = false } = {}) {
  const dialog = document.createElement('dialog');
  dialog.className = 'input-dialog';
  const field = multiline
    ? `<textarea name="value" ${allowEmpty ? '' : 'required'}>${escapeHtml(initialValue)}</textarea>`
    : `<input name="value" value="${escapeHtml(initialValue)}" ${allowEmpty ? '' : 'required'}>`;
  dialog.innerHTML = `
    <form method="dialog">
      <h2>${escapeHtml(title)}</h2>
      <label>${multiline ? 'Text' : 'Value'}${field}</label>
      <div class="actions">
        <button class="button" value="cancel">Cancel</button>
        <button class="button primary" value="save">Save</button>
      </div>
    </form>`;
  document.body.append(dialog);
  return new Promise((resolve) => {
    dialog.addEventListener('close', () => {
      const value = dialog.returnValue === 'save' ? dialog.querySelector('[name="value"]').value : null;
      dialog.remove();
      resolve(value);
    }, { once: true });
    dialog.showModal();
    dialog.querySelector('[name="value"]').focus();
  });
}

function askConfirmation(message) {
  const dialog = document.createElement('dialog');
  dialog.className = 'input-dialog';
  dialog.innerHTML = `
    <form method="dialog">
      <h2>${escapeHtml(message)}</h2>
      <div class="actions">
        <button class="button" value="cancel">Cancel</button>
        <button class="button primary" value="confirm">Confirm</button>
      </div>
    </form>`;
  document.body.append(dialog);
  return new Promise((resolve) => {
    dialog.addEventListener('close', () => {
      const confirmed = dialog.returnValue === 'confirm';
      dialog.remove();
      resolve(confirmed);
    }, { once: true });
    dialog.showModal();
  });
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    credentials: 'same-origin',
    ...options,
    headers: {
      ...(options.body ? { 'content-type': 'application/json' } : {}),
      ...options.headers,
    },
    body: options.body && typeof options.body !== 'string'
      ? JSON.stringify(options.body)
      : options.body,
  });
  if (response.status === 204) return null;
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || `Request failed (${response.status}).`);
  return result;
}

function userAvatar(user, size = '') {
  if (user?.avatar) return `<img class="avatar ${size}" src="${escapeHtml(user.avatar)}" alt="">`;
  return `<span class="avatar avatar-fallback ${size}" aria-hidden="true">${escapeHtml((user?.username || '?').slice(0, 1).toUpperCase())}</span>`;
}

function renderAuth() {
  root.innerHTML = `
    <section class="auth-card">
      <a class="brand" href="/"><span class="brand-mark">S</span> Story Studio</a>
      <h1 style="margin-top:28px">Write together.</h1>
      <p class="muted">Sign in or create an account to collaborate on stories.</p>
      <div class="row">
        <button class="button primary" data-action="show-login">Sign in</button>
        <button class="button" data-action="show-register">Create account</button>
      </div>
      <form id="auth-form" data-mode="login">
        <label>Username<input name="username" required minlength="3" maxlength="30" autocomplete="username"></label>
        <label class="register-only hidden">Email<input name="email" type="email" autocomplete="email"></label>
        <label class="register-only hidden">Display name<input name="displayName" maxlength="80" autocomplete="name"></label>
        <label>Password<input name="password" type="password" required minlength="12" autocomplete="current-password"></label>
        <button class="button primary" type="submit">Sign in</button>
        <p class="muted" style="margin:12px 0 0">Passwords must be at least 12 characters.</p>
      </form>
    </section>`;
}

function render() {
  if (!state.user) {
    renderAuth();
    return;
  }
  if (state.page === 'profile' && state.profileData) {
    renderProfile();
    return;
  }
  root.innerHTML = `
    <header class="topbar">
      <a class="brand" href="/"><span class="brand-mark">S</span> Story Studio</a>
      <div class="user-tools">
        <button class="button" data-action="profile">${userAvatar(state.user)} Profile</button>
        <button class="button" data-action="logout">Sign out</button>
      </div>
    </header>
    <div class="layout">
      <aside class="panel">
        <h2>Your stories</h2>
        <button class="button primary" data-action="new-story">＋ New story</button>
        <nav class="story-list" aria-label="Stories">
          ${state.stories.map((story) => `
            <button class="story-link${story.id === state.story?.id ? ' active' : ''}" data-action="open-story" data-id="${escapeHtml(story.id)}">
              <strong>${escapeHtml(story.title)}</strong>
              <span>${new Date(story.updatedAt).toLocaleString()}</span>
            </button>`).join('') || '<p class="empty">Create a story to get started.</p>'}
        </nav>
        <button class="button" data-action="profile">${escapeHtml(state.user.username)} · View profile</button>
      </aside>
      <section id="story-area">
        ${state.story ? renderStory() : '<div class="story-card empty"><h1>Your next story starts here.</h1><p>Create a story or choose one from the list.</p></div>'}
      </section>
    </div>`;
}

function renderProfile() {
  const { user, storiesCreated, storiesContributedTo } = state.profileData;
  root.innerHTML = `
    <header class="topbar">
      <a class="brand" href="/"><span class="brand-mark">S</span> Story Studio</a>
      <div class="user-tools">
        <button class="button" data-action="back-to-stories">Back to stories</button>
        <button class="button" data-action="logout">Sign out</button>
      </div>
    </header>
    <section class="story-card">
      <h1>Your profile</h1>
      <p class="muted">Your account details and story activity.</p>
      <div class="avatar-upload">
        ${userAvatar(user)}
        <label>Upload avatar<input id="avatar-file" type="file" accept="image/png,image/jpeg,image/webp,image/gif"></label>
      </div>
      <form id="profile-form">
        <label>Username<input value="${escapeHtml(user.username)}" disabled></label>
        <label>Email<input value="${escapeHtml(user.email)}" disabled></label>
        <label>Display name<input name="displayName" value="${escapeHtml(user.displayName || '')}" maxlength="80"></label>
        <button class="button primary" type="submit">Save profile</button>
      </form>
      <div class="section">
        <h2>Stories created <span class="muted">(${storiesCreated.length})</span></h2>
        <div class="story-list">${storiesCreated.map((story) => `<button class="story-link" data-action="open-story" data-id="${escapeHtml(story.id)}"><strong>${escapeHtml(story.title)}</strong></button>`).join('') || '<p class="muted">No stories created yet.</p>'}</div>
      </div>
      <div class="section">
        <h2>Stories contributed to <span class="muted">(${storiesContributedTo.length})</span></h2>
        <div class="story-list">${storiesContributedTo.map((story) => `<button class="story-link" data-action="open-story" data-id="${escapeHtml(story.id)}"><strong>${escapeHtml(story.title)}</strong></button>`).join('') || '<p class="muted">No contributed stories yet.</p>'}</div>
      </div>
    </section>`;
}

function renderStory() {
  const story = state.story;
  const isAuthor = story.authorId === state.user.id;
  const canEdit = story.contributorIds.includes(state.user.id);
  const canComment = story.commentsEnabled;
  return `
    <article class="story-card">
      <p class="story-meta">Updated ${new Date(story.updatedAt).toLocaleString()} · ${story.contributorIds.length} contributor${story.contributorIds.length === 1 ? '' : 's'}</p>
      ${canEdit ? `
        <label class="hidden" for="story-title">Story title</label>
        <input id="story-title" class="story-title-input" value="${escapeHtml(story.title)}" maxlength="160">
        <label class="hidden" for="story-content">Story content</label>
        <textarea id="story-content" maxlength="100000" aria-label="Story content">${escapeHtml(story.content)}</textarea>
        <div class="cursors" id="cursor-status" aria-live="polite"></div>
        <div class="actions" style="margin-top:12px">
          <button class="button primary" data-action="save-story">Save changes</button>
          <button class="button" data-action="share-story">Share</button>
          ${isAuthor ? '<button class="button" data-action="contributors">Manage contributors</button>' : ''}
        </div>
      ` : `
        <h1>${escapeHtml(story.title)}</h1>
        <div class="story-content">${escapeHtml(story.content) || '<span class="muted">This story is empty.</span>'}</div>
        <div class="actions" style="margin-top:12px"><button class="button" data-action="share-story">Share</button></div>
      `}
      ${isAuthor ? `
        <div class="section">
          <h2>Story settings</h2>
          <label class="row"><input id="comments-enabled" type="checkbox" style="width:auto" ${story.commentsEnabled ? 'checked' : ''}> Allow comments</label>
          <button class="button small" data-action="toggle-comments">Save comment setting</button>
        </div>
        <div class="section">
          <h2>Version history</h2>
          <button class="button small" data-action="load-versions">Show previous versions</button>
          <ul class="history-list">${state.versions.map((version) => `
            <li class="history-item"><span>${new Date(version.timestamp).toLocaleString()} · ${escapeHtml(version.title)}</span>
              <button class="button small" data-action="restore-version" data-id="${escapeHtml(version.id)}">Restore</button>
            </li>`).join('') || '<li class="muted">No saved versions yet.</li>'}
          </ul>
        </div>
      ` : ''}
      ${state.shareLinks ? `<div class="notice" style="margin-top:16px">
        <label>Share link<input readonly value="${escapeHtml(state.shareLinks.url)}"></label>
        <div class="actions">
          <a class="button small" href="${escapeHtml(state.shareLinks.xUrl)}" target="_blank" rel="noreferrer">Share on X</a>
          <a class="button small" href="${escapeHtml(state.shareLinks.facebookUrl)}" target="_blank" rel="noreferrer">Share on Facebook</a>
        </div>
      </div>` : ''}
      <section class="section">
        <h2>Comments <span class="muted">(${state.comments.length})</span></h2>
        ${canComment ? `
          <form id="comment-form" class="comment-form">
            <label class="hidden" for="comment-text">Write a comment</label>
            <textarea id="comment-text" maxlength="5000" placeholder="Add to the conversation…" required></textarea>
            <button class="button primary" type="submit">Comment</button>
          </form>
        ` : '<p class="notice">The author has turned off comments for this story.</p>'}
        <div>${state.comments.map((comment) => renderComment(comment, isAuthor)).join('') || '<p class="muted">No comments yet.</p>'}</div>
      </section>
    </article>`;
}

function renderComment(comment, isStoryAuthor) {
  const own = comment.userId === state.user.id;
  const reactions = comment.reactions || {};
  return `<article class="comment" data-comment-id="${escapeHtml(comment.id)}">
    <div class="comment-head"><span class="row">${userAvatar(comment.author)} <strong>${escapeHtml(comment.author?.displayName || comment.author?.username || 'User')}</strong></span>
      <span class="row">${own ? '<button class="button small" data-action="edit-comment">Edit</button>' : ''}
      ${own || isStoryAuthor ? '<button class="button small danger" data-action="delete-comment">Delete</button>' : ''}</span>
    </div>
    <p class="comment-body">${escapeHtml(comment.commentText)}</p>
    <div class="reaction-row">${['❤️', '👍', '😂', '🎉'].map((emoji) => {
      const users = reactions[emoji] || [];
      return `<button class="reaction${users.includes(state.user.id) ? ' selected' : ''}" data-action="react" data-emoji="${emoji}" aria-label="React ${emoji}">${emoji} <span>${users.length || ''}</span></button>`;
    }).join('')}</div>
    <small class="muted">${new Date(comment.timestamp).toLocaleString()}</small>
  </article>`;
}

async function loadStories(keepSelection = true) {
  const { stories } = await api('/api/stories');
  state.stories = stories;
  if (keepSelection && state.story) {
    state.story = stories.find((story) => story.id === state.story.id) || state.story;
  }
  render();
}

async function openStory(id) {
  const [{ story }, { comments }] = await Promise.all([
    api(`/api/stories/${encodeURIComponent(id)}`),
    api(`/api/comments/${encodeURIComponent(id)}`),
  ]);
  state.story = story;
  state.page = 'stories';
  state.shareLinks = null;
  state.comments = comments;
  state.versions = [];
  state.cursors.clear();
  state.socket?.emit('story:join', story.id, (result) => {
    if (result?.error) showToast(result.error, true);
  });
  render();
}

function connectSocket() {
  if (state.socket) return;
  state.socket = window.io({ withCredentials: true });
  state.socket.on('connect_error', (error) => showToast(error.message, true));
  state.socket.on('story:updated', ({ story }) => {
    if (state.story?.id !== story.id) return;
    state.story = story;
    state.stories = state.stories.map((item) => item.id === story.id ? story : item);
    render();
  });
  state.socket.on('story:cursor', ({ user, position }) => {
    state.cursors.set(user.id, `${user.displayName || user.username} is editing near character ${position}`);
    const target = document.querySelector('#cursor-status');
    if (target) target.textContent = [...state.cursors.values()].join(' · ');
  });
  state.socket.on('comment:created', (comment) => {
    if (comment.storyId !== state.story?.id) return;
    state.comments.push(comment);
    render();
  });
  state.socket.on('comment:updated', (comment) => updateComment(comment.id, (old) => ({ ...old, ...comment })));
  state.socket.on('comment:deleted', ({ id }) => {
    state.comments = state.comments.filter((comment) => comment.id !== id);
    render();
  });
  state.socket.on('comment:reactions', ({ id, reactions }) => updateComment(id, (comment) => ({ ...comment, reactions })));
}

function updateComment(id, updater) {
  state.comments = state.comments.map((comment) => comment.id === id ? updater(comment) : comment);
  render();
}

root.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const { action, id } = button.dataset;
  try {
    if (action === 'show-login' || action === 'show-register') {
      const form = document.querySelector('#auth-form');
      const registering = action === 'show-register';
      form.dataset.mode = registering ? 'register' : 'login';
      form.querySelectorAll('.register-only').forEach((element) => element.classList.toggle('hidden', !registering));
      form.querySelector('[name="email"]').required = registering;
      form.querySelector('[name="password"]').autocomplete = registering ? 'new-password' : 'current-password';
      form.querySelector('button[type="submit"]').textContent = registering ? 'Create account' : 'Sign in';
    } else if (action === 'open-story') {
      await openStory(id);
    } else if (action === 'new-story') {
      const title = await askText('Create a story', '', { allowEmpty: false });
      if (!title?.trim()) return;
      const { story } = await api('/api/stories', { method: 'POST', body: { title: title.trim(), content: '' } });
      await loadStories(false);
      await openStory(story.id);
    } else if (action === 'save-story') {
      const payload = {
        storyId: state.story.id,
        title: document.querySelector('#story-title').value,
        content: document.querySelector('#story-content').value,
      };
      await new Promise((resolve, reject) => {
        state.socket.timeout(10_000).emit('story:edit', payload, (error, result) => {
          if (error) reject(new Error('Story save timed out.'));
          else if (result.error) reject(new Error(result.error));
          else resolve(result);
        });
      });
      await loadStories();
      showToast('Story saved and version recorded.');
    } else if (action === 'share-story') {
      const links = await api(`/api/shares/${state.story.id}`, { method: 'POST', body: {} });
      showToast('Share link created.');
      state.shareLinks = links;
      render();
    } else if (action === 'toggle-comments') {
      const { story } = await api(`/api/stories/${state.story.id}/settings`, {
        method: 'PATCH',
        body: { commentsEnabled: document.querySelector('#comments-enabled').checked },
      });
      state.story = story;
      render();
      showToast('Comment settings saved.');
    } else if (action === 'contributors') {
      const { contributors } = await api(`/api/stories/${state.story.id}/contributors`);
      const current = contributors
        .filter((user) => user.id !== state.user.id)
        .map((user) => user.username)
        .join(', ');
      const usernames = await askText('Manage contributors', current, { allowEmpty: true });
      if (usernames === null) return;
      const names = usernames.split(',').map((name) => name.trim()).filter(Boolean);
      const { story } = await api(`/api/stories/${state.story.id}/contributors`, {
        method: 'PUT', body: { usernames: names },
      });
      state.story = story;
      render();
      showToast('Contributors updated.');
    } else if (action === 'load-versions') {
      const { versions } = await api(`/api/stories/${state.story.id}/versions`);
      state.versions = versions;
      render();
    } else if (action === 'restore-version') {
      if (!await askConfirmation('Restore this version? The current story will first be saved as a new version.')) return;
      const { story } = await api(`/api/stories/${state.story.id}/versions/${id}/restore`, { method: 'POST', body: {} });
      state.story = story;
      await loadStories();
      showToast('Version restored.');
    } else if (action === 'delete-comment') {
      const comment = button.closest('.comment');
      if (!await askConfirmation('Delete this comment?')) return;
      await api(`/api/comments/${comment.dataset.commentId}`, { method: 'DELETE' });
    } else if (action === 'edit-comment') {
      const commentElement = button.closest('.comment');
      const comment = state.comments.find((item) => item.id === commentElement.dataset.commentId);
      const commentText = await askText('Edit comment', comment.commentText, { multiline: true });
      if (commentText === null) return;
      const { comment: updated } = await api(`/api/comments/${comment.id}`, {
        method: 'PATCH', body: { comment_text: commentText },
      });
      updateComment(comment.id, (old) => ({ ...old, ...updated }));
    } else if (action === 'react') {
      const commentElement = button.closest('.comment');
      const comment = state.comments.find((item) => item.id === commentElement.dataset.commentId);
      const previous = structuredClone(comment.reactions || {});
      const emoji = button.dataset.emoji;
      const users = new Set(previous[emoji] || []);
      if (users.has(state.user.id)) users.delete(state.user.id);
      else users.add(state.user.id);
      const optimistic = { ...previous };
      if (users.size) optimistic[emoji] = [...users];
      else delete optimistic[emoji];
      updateComment(comment.id, (old) => ({ ...old, reactions: optimistic }));
      try {
        const result = await api(`/api/comments/${comment.id}/reactions`, { method: 'POST', body: { emoji } });
        updateComment(comment.id, (old) => ({ ...old, reactions: result.reactions }));
      } catch (error) {
        updateComment(comment.id, (old) => ({ ...old, reactions: previous }));
        throw error;
      }
    } else if (action === 'profile') {
      await showProfile();
    } else if (action === 'back-to-stories') {
      state.page = 'stories';
      render();
    } else if (action === 'logout') {
      await api('/api/auth/logout', { method: 'POST' });
      state.socket?.disconnect();
      state.socket = null;
      state.user = null;
      state.story = null;
      state.page = 'stories';
      renderAuth();
    }
  } catch (error) {
    showToast(error.message, true);
  }
});

root.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.target;
  try {
    if (form.id === 'auth-form') {
      const data = Object.fromEntries(new FormData(form));
      const endpoint = form.dataset.mode === 'register' ? '/api/auth/register' : '/api/auth/login';
      const { user } = await api(endpoint, { method: 'POST', body: data });
      state.user = user;
      connectSocket();
      await loadStories(false);
    } else if (form.id === 'comment-form') {
      const commentText = form.querySelector('#comment-text').value;
      const { comment } = await api('/api/comments', {
        method: 'POST',
        body: { story_id: state.story.id, comment_text: commentText },
      });
      if (!state.comments.some((item) => item.id === comment.id)) state.comments.push(comment);
      render();
    } else if (form.id === 'profile-form') {
      const { user } = await api('/api/profile', {
        method: 'PATCH',
        body: { displayName: new FormData(form).get('displayName') },
      });
      state.user = user;
      state.profileData.user = user;
      render();
      showToast('Profile saved.');
    }
  } catch (error) {
    showToast(error.message, true);
  }
});

root.addEventListener('change', async (event) => {
  if (event.target.id !== 'avatar-file') return;
  const file = event.target.files?.[0];
  if (!file) return;
  if (file.size > 2 * 1024 * 1024) {
    showToast('Choose an image smaller than 2 MB.', true);
    return;
  }
  try {
    const avatar = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Could not read the selected image.'));
      reader.readAsDataURL(file);
    });
    const { user } = await api('/api/profile', { method: 'PATCH', body: { avatar } });
    state.user = user;
    state.profileData.user = user;
    render();
    showToast('Avatar updated.');
  } catch (error) {
    showToast(error.message, true);
  }
});

root.addEventListener('input', (event) => {
  if (event.target.id === 'story-content' && state.story) {
    state.socket?.emit('story:cursor', {
      storyId: state.story.id,
      position: event.target.selectionStart,
    });
  }
});

async function showProfile() {
  state.profileData = await api(`/api/profile/${encodeURIComponent(state.user.username)}`);
  state.page = 'profile';
  render();
}

async function showSharedStory(token) {
  try {
    const { story } = await api(`/api/shares/${encodeURIComponent(token)}`);
    root.innerHTML = `<article class="story-card share-preview">
      <a class="brand" href="/"><span class="brand-mark">S</span> Story Studio</a>
      <p class="story-meta" style="margin-top:28px">Shared story</p>
      <h1>${escapeHtml(story.title)}</h1>
      <div class="story-content">${escapeHtml(story.content)}</div>
      <p style="margin-top:24px"><a class="button primary" href="/">Open Story Studio</a></p>
    </article>`;
  } catch (error) {
    root.innerHTML = `<section class="auth-card"><h1>Share unavailable</h1><p class="muted">${escapeHtml(error.message)}</p><a class="button" href="/">Go to Story Studio</a></section>`;
  }
}

async function start() {
  const shareMatch = window.location.pathname.match(/^\/share\/([^/]+)$/);
  if (shareMatch) {
    await showSharedStory(shareMatch[1]);
    return;
  }
  try {
    const { user } = await api('/api/auth/me');
    state.user = user;
    connectSocket();
    await loadStories(false);
  } catch {
    renderAuth();
  }
}

start().catch((error) => showToast(error.message, true));
