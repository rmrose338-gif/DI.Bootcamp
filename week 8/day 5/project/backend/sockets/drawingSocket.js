import { Drawing } from '../models/Drawing.js';
import { Project } from '../models/Project.js';

const roomName = (projectId) => `drawing:${projectId}`;

function validateStroke(stroke) {
  if (!stroke || !['pen', 'eraser'].includes(stroke.tool)) return false;
  if (typeof stroke.color !== 'string' || !/^#[\da-f]{6}$/i.test(stroke.color)) return false;
  if (!Number.isFinite(stroke.size) || stroke.size < 1 || stroke.size > 40) return false;
  if (!Array.isArray(stroke.points) || stroke.points.length < 1 || stroke.points.length > 2500) return false;
  return stroke.points.every((point) => Number.isFinite(point.x) && Number.isFinite(point.y) && point.x >= 0 && point.x <= 1 && point.y >= 0 && point.y <= 1);
}

async function updatePresence(io, room) {
  const sockets = await io.in(room).fetchSockets();
  io.to(room).emit('room:presence', { count: sockets.length });
}

export function attachDrawingSocket(io) {
  io.on('connection', (socket) => {
    const userId = socket.request.session?.userId;
    if (!userId) {
      socket.disconnect(true);
      return;
    }

    socket.on('room:join', async (payload = {}, acknowledge = () => {}) => {
      const reply = typeof acknowledge === 'function' ? acknowledge : () => {};
      const projectId = String(payload.projectId || '');
      const project = Project.findById(projectId);
      const drawing = project && Drawing.getByProjectId(projectId);
      if (!project || !drawing) {
        reply({ ok: false, error: 'That canvas could not be found.' });
        return;
      }
      if (socket.data.room) socket.leave(socket.data.room);
      socket.data.room = roomName(projectId);
      socket.data.projectId = projectId;
      socket.join(socket.data.room);
      reply({ ok: true });
      socket.emit('room:state', { strokes: drawing.strokes });
      socket.to(socket.data.room).emit('room:joined', { userId });
      await updatePresence(io, socket.data.room);
    });

    socket.on('drawing:stroke', (payload = {}, acknowledge = () => {}) => {
      const reply = typeof acknowledge === 'function' ? acknowledge : () => {};
      const projectId = String(payload.projectId || '');
      if (!socket.data.room || socket.data.projectId !== projectId || !validateStroke(payload.stroke)) {
        reply({ ok: false, error: 'This drawing update was not valid.' });
        return;
      }
      if (!Drawing.appendStroke(projectId, payload.stroke)) {
        reply({ ok: false, error: 'That canvas could not be found.' });
        return;
      }
      socket.to(socket.data.room).emit('drawing:stroke', payload.stroke);
      reply({ ok: true });
    });

    socket.on('drawing:clear', (payload = {}, acknowledge = () => {}) => {
      const reply = typeof acknowledge === 'function' ? acknowledge : () => {};
      const projectId = String(payload.projectId || '');
      if (!socket.data.room || socket.data.projectId !== projectId || !Drawing.clear(projectId)) {
        reply({ ok: false, error: 'This canvas could not be cleared.' });
        return;
      }
      io.to(socket.data.room).emit('drawing:clear');
      reply({ ok: true });
    });

    socket.on('disconnect', () => {
      if (socket.data.room) void updatePresence(io, socket.data.room);
    });
  });
}