import { api, showToast } from './main.js';

const projectList = document.querySelector('#project-list');
const countLabel = document.querySelector('#project-count');
const dialog = document.querySelector('#project-dialog');
const projectForm = document.querySelector('#project-form');

function formatDate(value) {
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(new Date(value));
}

function createCard(project) {
  const link = document.createElement('a');
  link.className = 'project-card';
  link.href = `/drawing-room.html?id=${encodeURIComponent(project.id)}`;
  const preview = document.createElement('div');
  preview.className = 'project-preview';
  preview.setAttribute('aria-hidden', 'true');
  const info = document.createElement('div');
  info.className = 'project-info';
  const title = document.createElement('strong');
  title.textContent = project.title;
  const date = document.createElement('span');
  date.textContent = formatDate(project.updatedAt);
  info.append(title, date);
  link.append(preview, info);
  return link;
}

async function loadProjects() {
  projectList.replaceChildren();
  countLabel.textContent = 'Loading';
  try {
    const { projects } = await api('/api/drawings');
    countLabel.textContent = `${projects.length} ${projects.length === 1 ? 'canvas' : 'canvases'}`;
    if (projects.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty-projects';
      const title = document.createElement('strong');
      title.textContent = 'Your first canvas is waiting.';
      const text = document.createElement('p');
      text.textContent = 'Start with a line, a color, or an idea you want to share.';
      const button = document.createElement('button');
      button.className = 'button button-pink';
      button.type = 'button';
      button.textContent = 'Make a canvas';
      button.addEventListener('click', () => dialog.showModal());
      empty.append(title, text, button);
      projectList.append(empty);
      return;
    }
    projects.forEach((project) => projectList.append(createCard(project)));
  } catch (error) {
    countLabel.textContent = 'Unavailable';
    const message = document.createElement('p');
    message.className = 'loading-note';
    message.textContent = error.message;
    projectList.append(message);
  }
}

document.querySelector('#new-project')?.addEventListener('click', () => dialog.showModal());
document.querySelectorAll('[data-close-dialog]').forEach((button) => button.addEventListener('click', () => dialog.close()));
dialog?.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });

projectForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const message = document.querySelector('#project-message');
  const button = projectForm.querySelector('[type="submit"]');
  button.disabled = true;
  message.textContent = '';
  try {
    const { project } = await api('/api/drawings', {
      method: 'POST',
      body: JSON.stringify({ title: projectForm.elements.title.value }),
    });
    window.location.assign(`/drawing-room.html?id=${encodeURIComponent(project.id)}`);
  } catch (error) {
    message.textContent = error.message;
  } finally {
    button.disabled = false;
  }
});

loadProjects();