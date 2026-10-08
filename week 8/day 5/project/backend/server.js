import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Server as SocketServer } from 'socket.io';
import './models/User.js';
import authRoutes from './routes/authRoutes.js';
import drawingRoutes from './routes/drawingRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { attachDrawingSocket } from './sockets/drawingSocket.js';

const backendDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(backendDirectory, '..');
dotenv.config({ path: path.join(projectDirectory, '.env') });

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);
const frontendDirectory = path.join(projectDirectory, 'frontend');
const sessionSecret = process.env.SESSION_SECRET || 'local-development-only-replace-before-deploy';
const sessionMiddleware = cookieSession({
  name: 'common-canvas-session',
  keys: [sessionSecret],
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
});

app.disable('x-powered-by');
app.set('trust proxy', process.env.NODE_ENV === 'production' ? 1 : false);
app.use(express.json({ limit: '1mb' }));
app.use(sessionMiddleware);
io.engine.use(sessionMiddleware);

app.get('/api/health', (_request, response) => response.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/drawings', drawingRoutes);
app.use(express.static(frontendDirectory, { extensions: ['html'], index: 'index.html', maxAge: '1h' }));
app.get('*path', (_request, response) => response.sendFile(path.join(frontendDirectory, 'index.html')));

app.use((error, _request, response, _next) => {
  console.error(error);
  if (response.headersSent) return;
  return response.status(500).json({ error: 'Something went wrong on the server.' });
});

attachDrawingSocket(io);

const port = Number(process.env.PORT) || 3000;
fs.mkdirSync(path.join(backendDirectory, 'data'), { recursive: true });
server.listen(port, () => console.log(`Common Canvas is running at http://localhost:${port}`));

function close() {
  io.close(() => server.close());
}
process.on('SIGINT', close);
process.on('SIGTERM', close);