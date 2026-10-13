import { randomUUID } from 'node:crypto';
import { db } from '../../database/database.js';

function toPublic(user) {
  if (!user) return null;
  return { id: user.id, name: user.name, createdAt: user.created_at };
}

export const User = {
  findByName(name) {
    return db.prepare('SELECT * FROM users WHERE name = ? COLLATE NOCASE').get(name);
  },
  findById(id) {
    return toPublic(db.prepare('SELECT id, name, email, created_at FROM users WHERE id = ?').get(id));
  },
  create({ name, passwordHash }) {
    const id = randomUUID();
    const user = { id, name, email: `${id}@students.commoncanvas.local`, passwordHash, createdAt: new Date().toISOString() };
    db.prepare('INSERT INTO users (id, name, email, password_hash, created_at) VALUES (?, ?, ?, ?, ?)')
      .run(user.id, user.name, user.email, user.passwordHash, user.createdAt);
    return this.findById(user.id);
  },
  updateProfile(id, { name }) {
    db.prepare('UPDATE users SET name = ? WHERE id = ?').run(name, id);
    return this.findById(id);
  },
};