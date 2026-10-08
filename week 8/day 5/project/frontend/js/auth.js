import { api } from './main.js';

const form = document.querySelector('#auth-form');
if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const message = document.querySelector('#form-message');
    const submit = form.querySelector('[type="submit"]');
    const mode = form.dataset.mode;
    message.textContent = '';
    submit.disabled = true;
    submit.setAttribute('aria-busy', 'true');
    const body = Object.fromEntries(new FormData(form));
    try {
      await api(`/api/auth/${mode}`, { method: 'POST', body: JSON.stringify(body) });
      const requested = new URLSearchParams(window.location.search).get('next');
      const next = requested?.startsWith('/') && !requested.startsWith('//') ? requested : '/dashboard.html';
      window.location.assign(next);
    } catch (error) {
      message.textContent = error.message;
    } finally {
      submit.disabled = false;
      submit.removeAttribute('aria-busy');
    }
  });
}