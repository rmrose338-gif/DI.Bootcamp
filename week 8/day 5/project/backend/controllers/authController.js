import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function register(request, response) {
  const name = String(request.body.name || '').trim();
  const email = String(request.body.email || '').trim().toLowerCase();
  const password = String(request.body.password || '');
  if (name.length < 2 || name.length > 40) return response.status(400).json({ error: 'Name must be between 2 and 40 characters.' });
  if (!emailPattern.test(email) || email.length > 254) return response.status(400).json({ error: 'Enter a valid email address.' });
  if (password.length < 8 || Buffer.byteLength(password) > 72) return response.status(400).json({ error: 'Password must be at least 8 characters and no more than 72 bytes.' });
  if (User.findByEmail(email)) return response.status(409).json({ error: 'An account with that email already exists.' });

  try {
    const user = User.create({ name, email, passwordHash: await bcrypt.hash(password, 12) });
    request.session = { userId: user.id };
    return response.status(201).json({ user });
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') return response.status(409).json({ error: 'An account with that email already exists.' });
    throw error;
  }
}

export async function login(request, response) {
  const email = String(request.body.email || '').trim().toLowerCase();
  const password = String(request.body.password || '');
  const userRecord = User.findByEmail(email);
  if (!userRecord || !(await bcrypt.compare(password, userRecord.password_hash))) {
    return response.status(401).json({ error: 'Email or password did not match.' });
  }
  const user = User.findById(userRecord.id);
  request.session = { userId: user.id };
  return response.json({ user });
}

export function logout(request, response) {
  request.session = null;
  return response.json({ ok: true });
}