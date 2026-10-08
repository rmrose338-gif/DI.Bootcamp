import { User } from '../models/User.js';

export function requireAuth(request, response, next) {
  const userId = request.session?.userId;
  if (!userId) return response.status(401).json({ error: 'Please sign in to continue.' });
  const user = User.findById(userId);
  if (!user) {
    request.session = null;
    return response.status(401).json({ error: 'Your session has expired. Please sign in again.' });
  }
  request.user = user;
  return next();
}