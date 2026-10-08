import { User } from '../models/User.js';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function getMe(request, response) {
  return response.json({ user: request.user });
}

export function updateMe(request, response) {
  const name = String(request.body.name || '').trim();
  const email = String(request.body.email || '').trim().toLowerCase();
  if (name.length < 2 || name.length > 40) return response.status(400).json({ error: 'Name must be between 2 and 40 characters.' });
  if (!emailPattern.test(email) || email.length > 254) return response.status(400).json({ error: 'Enter a valid email address.' });
  try {
    return response.json({ user: User.updateProfile(request.user.id, { name, email }) });
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') return response.status(409).json({ error: 'That email address is already in use.' });
    throw error;
  }
}