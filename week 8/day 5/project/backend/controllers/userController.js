import { User } from '../models/User.js';

export function getMe(request, response) {
  return response.json({ user: request.user });
}

export function updateMe(request, response) {
  const name = String(request.body.name || '').trim();
  if (name.length < 2 || name.length > 40) return response.status(400).json({ error: 'Name must be between 2 and 40 characters.' });
  try {
    return response.json({ user: User.updateProfile(request.user.id, { name }) });
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') return response.status(409).json({ error: 'That student name is already in use. Choose another one.' });
    throw error;
  }
}