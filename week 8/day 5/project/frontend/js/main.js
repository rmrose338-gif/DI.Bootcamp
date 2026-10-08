export async function api(path, options = {}) {
  const headers = new Headers(options.headers || {});
  if (options.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  const response = await fetch(path, { ...options, headers, credentials: 'same-origin' });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.error || 'Something went wrong. Please try again.');
    error.status = response.status;
    throw error;
  }
  return payload;
}

export function showToast(message, isError = false) {
  const toast = document.querySelector('.toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.toggle('is-error', isError);
  toast.classList.add('is-visible');
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove('is-visible'), 3000);
}

export function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase() || '').join('') || 'CC';
}

function setInitials(name) {
  document.querySelectorAll('.avatar-button, .user-initials, #profile-avatar').forEach((element) => {
    element.textContent = initials(name);
  });
}

async function boot() {
  const page = document.body.dataset.page;
  const protectedPages = new Set(['dashboard', 'drawing', 'profile']);
  const logoutButtons = document.querySelectorAll('[data-logout]');
  logoutButtons.forEach((button) => button.addEventListener('click', async () => {
    try { await api('/api/auth/logout', { method: 'POST' }); } finally { window.location.assign('/'); }
  }));

  if (!protectedPages.has(page)) return;
  try {
    const { user } = await api('/api/users/me');
    document.querySelectorAll('.user-label').forEach((element) => { element.textContent = user.name; });
    setInitials(user.name);
    document.querySelectorAll('[data-profile-link]').forEach((button) => button.addEventListener('click', () => window.location.assign('/profile.html')));
    const profileForm = document.querySelector('#profile-form');
    if (profileForm) {
      profileForm.elements.name.value = user.name;
      profileForm.elements.email.value = user.email;
      profileForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const message = document.querySelector('#profile-message');
        message.textContent = '';
        try {
          const updated = await api('/api/users/me', {
            method: 'PATCH',
            body: JSON.stringify({ name: profileForm.elements.name.value, email: profileForm.elements.email.value }),
          });
          document.querySelectorAll('.user-label').forEach((element) => { element.textContent = updated.user.name; });
          setInitials(updated.user.name);
          message.textContent = 'Your profile is up to date.';
          message.classList.add('is-success');
        } catch (error) {
          message.textContent = error.message;
          message.classList.remove('is-success');
        }
      });
    }
  } catch (error) {
    if (error.status === 401) {
      const next = `${window.location.pathname}${window.location.search}`;
      window.location.replace(`/login.html?next=${encodeURIComponent(next)}`);
    } else {
      showToast(error.message, true);
    }
  }
}

boot();