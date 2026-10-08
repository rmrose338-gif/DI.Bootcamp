export function connectRoom(projectId, handlers) {
  if (typeof window.io !== 'function') throw new Error('The live drawing connection could not start. Refresh the page to try again.');
  const socket = window.io({ reconnection: true, reconnectionAttempts: 8, timeout: 8000 });
  socket.on('connect', () => {
    handlers.onStatus?.('connecting', 'Joining your room...');
    socket.emit('room:join', { projectId }, (result) => {
      if (!result?.ok) handlers.onStatus?.('error', result?.error || 'Could not join this room.');
    });
  });
  socket.on('connect_error', () => handlers.onStatus?.('error', 'Connection interrupted. Retrying...'));
  socket.on('disconnect', () => handlers.onStatus?.('error', 'Connection lost. Reconnecting...'));
  socket.on('room:state', (payload) => handlers.onState?.(payload));
  socket.on('room:presence', (payload) => handlers.onPresence?.(payload));
  socket.on('drawing:stroke', (stroke) => handlers.onStroke?.(stroke));
  socket.on('drawing:clear', () => handlers.onClear?.());
  socket.on('room:error', (payload) => handlers.onStatus?.('error', payload.message || 'Room error.'));
  socket.on('room:joined', () => handlers.onStatus?.('connected', 'Connected - your lines are syncing.'));
  return socket;
}