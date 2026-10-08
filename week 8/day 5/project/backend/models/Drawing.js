import { db } from '../../database/database.js';
import { Project } from './Project.js';

const MAX_STROKES = 10000;

export const Drawing = {
  getByProjectId(projectId) {
    const row = db.prepare('SELECT strokes, updated_at FROM drawings WHERE project_id = ?').get(projectId);
    return row ? { strokes: JSON.parse(row.strokes), updatedAt: row.updated_at } : null;
  },
  appendStroke(projectId, stroke) {
    const drawing = this.getByProjectId(projectId);
    if (!drawing) return false;
    drawing.strokes.push(stroke);
    if (drawing.strokes.length > MAX_STROKES) drawing.strokes.splice(0, drawing.strokes.length - MAX_STROKES);
    const now = new Date().toISOString();
    db.prepare('UPDATE drawings SET strokes = ?, updated_at = ? WHERE project_id = ?').run(JSON.stringify(drawing.strokes), now, projectId);
    Project.touch(projectId);
    return true;
  },
  clear(projectId) {
    const now = new Date().toISOString();
    const result = db.prepare('UPDATE drawings SET strokes = ?, updated_at = ? WHERE project_id = ?').run('[]', now, projectId);
    if (result.changes) Project.touch(projectId);
    return result.changes > 0;
  },
};