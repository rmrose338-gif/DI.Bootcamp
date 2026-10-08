import { randomUUID } from 'node:crypto';
import { db } from '../../database/database.js';

function mapProject(project) {
  if (!project) return null;
  return { id: project.id, title: project.title, ownerId: project.owner_id, createdAt: project.created_at, updatedAt: project.updated_at };
}

export const Project = {
  listForOwner(ownerId) {
    return db.prepare('SELECT * FROM projects WHERE owner_id = ? ORDER BY updated_at DESC').all(ownerId).map(mapProject);
  },
  findById(id) {
    return mapProject(db.prepare('SELECT * FROM projects WHERE id = ?').get(id));
  },
  create(title, ownerId) {
    const id = randomUUID();
    const now = new Date().toISOString();
    const createProject = db.prepare('INSERT INTO projects (id, title, owner_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?)');
    const createDrawing = db.prepare('INSERT INTO drawings (project_id, strokes, updated_at) VALUES (?, ?, ?)');
    db.exec('BEGIN');
    try {
      createProject.run(id, title, ownerId, now, now);
      createDrawing.run(id, '[]', now);
      db.exec('COMMIT');
    } catch (error) {
      db.exec('ROLLBACK');
      throw error;
    }
    return this.findById(id);
  },
  touch(id) {
    db.prepare('UPDATE projects SET updated_at = ? WHERE id = ?').run(new Date().toISOString(), id);
  },
};