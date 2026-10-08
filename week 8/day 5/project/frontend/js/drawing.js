import { api, showToast } from './main.js';
import { connectRoom } from './collaboration.js';

const canvas = document.querySelector('#drawing-canvas');
const context = canvas?.getContext('2d');
const roomId = new URLSearchParams(window.location.search).get('id');
const strokes = [];
let roomSocket;
let currentStroke = null;
let activeTool = 'pen';
let activeColor = '#3457D5';
let brushSize = 7;
let pixelRatio = 1;

const brushPalette = [
  { color: '#3457D5', label: 'Royal blue' },
  { color: '#0C9B72', label: 'Emerald green' },
  { color: '#F27664', label: 'Warm coral' },
  { color: '#F2C14E', label: 'Golden yellow' },
  { color: '#9B8AFB', label: 'Soft lilac' },
  { color: '#7451B7', label: 'Elegant purple' },
  { color: '#172A46', label: 'Deep ink' },
];

document.querySelectorAll('.color-swatch').forEach((button, index) => {
  const preset = brushPalette[index];
  if (!preset) return;
  button.dataset.color = preset.color;
  button.style.setProperty('--swatch', preset.color);
  button.setAttribute('aria-label', preset.label);
});
document.querySelector('#custom-color').value = activeColor;

function setConnection(state, text) {
  const status = document.querySelector('#connection-status');
  if (!status) return;
  status.classList.toggle('is-connected', state === 'connected');
  status.classList.toggle('is-error', state === 'error');
  status.lastChild.textContent = ` ${text}`;
}

function setSavedLabel(text) {
  const label = document.querySelector('#saved-label');
  if (label) label.textContent = text;
}

function drawSegment(stroke, start, end) {
  if (!context) return;
  const bounds = canvas.getBoundingClientRect();
  context.save();
  context.globalCompositeOperation = stroke.tool === 'eraser' ? 'destination-out' : 'source-over';
  context.strokeStyle = stroke.tool === 'eraser' ? '#000' : stroke.color;
  context.fillStyle = stroke.tool === 'eraser' ? '#000' : stroke.color;
  context.lineWidth = stroke.size;
  context.lineCap = 'round';
  context.lineJoin = 'round';
  if (!start) {
    context.beginPath();
    context.arc(end.x * bounds.width, end.y * bounds.height, stroke.size / 2, 0, Math.PI * 2);
    context.fill();
  } else {
    context.beginPath();
    context.moveTo(start.x * bounds.width, start.y * bounds.height);
    context.lineTo(end.x * bounds.width, end.y * bounds.height);
    context.stroke();
  }
  context.restore();
}

function paintStroke(stroke) {
  if (!stroke.points?.length) return;
  if (stroke.points.length === 1) {
    drawSegment(stroke, null, stroke.points[0]);
    return;
  }
  for (let index = 1; index < stroke.points.length; index += 1) {
    drawSegment(stroke, stroke.points[index - 1], stroke.points[index]);
  }
}

function redraw() {
  if (!context) return;
  const bounds = canvas.getBoundingClientRect();
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  context.clearRect(0, 0, bounds.width, bounds.height);
  strokes.forEach(paintStroke);
}

function resizeCanvas() {
  if (!canvas) return;
  const bounds = canvas.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return;
  pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(bounds.width * pixelRatio);
  canvas.height = Math.round(bounds.height * pixelRatio);
  redraw();
}

function pointFromEvent(event) {
  const bounds = canvas.getBoundingClientRect();
  return { x: Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width)), y: Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height)) };
}

canvas?.addEventListener('pointerdown', (event) => {
  if (!roomSocket?.connected) {
    showToast('Wait for the room connection before drawing.', true);
    return;
  }
  event.preventDefault();
  canvas.setPointerCapture(event.pointerId);
  currentStroke = { tool: activeTool, color: activeColor, size: brushSize, points: [pointFromEvent(event)] };
  strokes.push(currentStroke);
  drawSegment(currentStroke, null, currentStroke.points[0]);
  setSavedLabel('Drawing...');
});

canvas?.addEventListener('pointermove', (event) => {
  if (!currentStroke) return;
  const point = pointFromEvent(event);
  const previous = currentStroke.points[currentStroke.points.length - 1];
  if (Math.hypot(point.x - previous.x, point.y - previous.y) < 0.0005) return;
  currentStroke.points.push(point);
  drawSegment(currentStroke, previous, point);
});

function finishStroke() {
  if (!currentStroke) return;
  const stroke = currentStroke;
  currentStroke = null;
  roomSocket.emit('drawing:stroke', { projectId: roomId, stroke }, (result) => {
    if (result?.ok) setSavedLabel('All changes saved');
    else {
      setSavedLabel('Not synced');
      showToast(result?.error || 'This stroke could not be saved.', true);
    }
  });
}

canvas?.addEventListener('pointerup', finishStroke);
canvas?.addEventListener('pointercancel', finishStroke);
canvas?.addEventListener('lostpointercapture', finishStroke);

document.querySelectorAll('[data-tool]').forEach((button) => button.addEventListener('click', () => {
  activeTool = button.dataset.tool;
  document.querySelectorAll('[data-tool]').forEach((item) => item.classList.toggle('is-selected', item === button));
}));

document.querySelectorAll('[data-color]').forEach((button) => button.addEventListener('click', () => {
  activeColor = button.dataset.color;
  document.querySelectorAll('[data-color]').forEach((item) => item.classList.toggle('selected', item === button));
}));

document.querySelector('#custom-color')?.addEventListener('input', (event) => {
  activeColor = event.target.value;
  document.querySelectorAll('[data-color]').forEach((item) => item.classList.remove('selected'));
});

document.querySelector('#brush-size')?.addEventListener('input', (event) => {
  brushSize = Number(event.target.value);
  document.querySelector('#size-value').textContent = String(brushSize);
});

document.querySelector('#clear-canvas')?.addEventListener('click', () => {
  if (!strokes.length || !window.confirm('Clear this shared canvas for everyone in the room?')) return;
  roomSocket.emit('drawing:clear', { projectId: roomId }, (result) => {
    if (!result?.ok) showToast(result?.error || 'The canvas could not be cleared.', true);
  });
});

document.querySelector('#download-png')?.addEventListener('click', () => {
  const bounds = canvas.getBoundingClientRect();
  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = canvas.width;
  exportCanvas.height = canvas.height;
  const exportContext = exportCanvas.getContext('2d');
  exportContext.fillStyle = '#fffdf8';
  exportContext.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
  exportContext.drawImage(canvas, 0, 0);
  const link = document.createElement('a');
  link.download = 'common-canvas.png';
  link.href = exportCanvas.toDataURL('image/png');
  link.click();
  void bounds;
});

document.querySelector('#share-room')?.addEventListener('click', async (event) => {
  const shareUrl = `${window.location.origin}/drawing-room.html?id=${encodeURIComponent(roomId)}`;
  try {
    await navigator.clipboard.writeText(shareUrl);
    event.currentTarget.textContent = 'Link copied';
    window.setTimeout(() => { event.currentTarget.innerHTML = 'Share room <span aria-hidden="true">&#8599;</span>'; }, 1600);
  } catch {
    window.prompt('Copy this room link:', shareUrl);
  }
});

async function start() {
  if (!roomId) {
    window.location.replace('/dashboard.html');
    return;
  }
  try {
    const { project, strokes: savedStrokes } = await api(`/api/drawings/${encodeURIComponent(roomId)}`);
    document.querySelector('#room-title').textContent = project.title;
    strokes.push(...savedStrokes);
    resizeCanvas();
    roomSocket = connectRoom(roomId, {
      onStatus: setConnection,
      onState: ({ strokes: latest }) => {
        strokes.splice(0, strokes.length, ...(latest || []));
        redraw();
      },
      onPresence: ({ count }) => { document.querySelector('#presence-count').textContent = `${count} ${count === 1 ? 'here' : 'here'}`; },
      onStroke: (stroke) => { strokes.push(stroke); paintStroke(stroke); setSavedLabel('A collaborator is drawing'); },
      onClear: () => { strokes.length = 0; redraw(); setSavedLabel('Canvas cleared'); },
    });
    roomSocket.on('drawing:stroke', () => setSavedLabel('All changes saved'));
    const container = document.querySelector('.canvas-frame');
    new ResizeObserver(resizeCanvas).observe(container);
  } catch (error) {
    showToast(error.message, true);
    if (error.status === 404) window.setTimeout(() => window.location.assign('/dashboard.html'), 1300);
  }
}

start();