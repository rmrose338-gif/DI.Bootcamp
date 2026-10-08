import { randomUUID } from 'node:crypto';
import { db } from '../../database/database.js';

function toPublic(user) {
  if (!user) return null;
  return { id: user.id, name: user.name, email: user.email, createdAt: user.created_at };
}

export const User = {
  findByEmail(email) {
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  },
  findById(id) {
    return toPublic(db.prepare('SELECT id, name, email, created_at FROM users WHERE id = ?').get(id));
  },
  create({ name, email, passwordHash }) {
    const user = { id: randomUUID(), name, email, passwordHash, createdAt: new Date().toISOString() };
    db.prepare('INSERT INTO users (id, name, email, password_hash, created_at) VALUES (?, ?, ?, ?, ?)')
      .run(user.id, user.name, user.email, user.passwordHash, user.createdAt);
    return this.findById(user.id);
  },
  updateProfile(id, { name, email }) {
    db.prepare('UPDATE users SET name = ?, email = ? WHERE id = ?').run(name, email, id);
    return this.findById(id);
  },
};