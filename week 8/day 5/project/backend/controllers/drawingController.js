import { Drawing } from '../models/Drawing.js';
import { Project } from '../models/Project.js';

export function listProjects(request, response) {
  return response.json({ projects: Project.listForOwner(request.user.id) });
}

export function createProject(request, response) {
  const title = String(request.body.title || '').trim();
  const template = String(request.body.template || 'solution-map');
  if (title.length < 1 || title.length > 60) return response.status(400).json({ error: 'Canvas name must be between 1 and 60 characters.' });
  if (!['solution-map', 'free'].includes(template)) return response.status(400).json({ error: 'Choose a valid canvas format.' });
  return response.status(201).json({ project: Project.create(title, request.user.id, template) });
}

export function getDrawing(request, response) {
  const project = Project.findById(request.params.id);
  if (!project) return response.status(404).json({ error: 'That canvas could not be found.' });
  const drawing = Drawing.getByProjectId(project.id);
  if (!drawing) return response.status(404).json({ error: 'That canvas could not be found.' });
  return response.json({ project, strokes: drawing.strokes });
}

export function clearDrawing(request, response) {
  if (!Project.findById(request.params.id)) return response.status(404).json({ error: 'That canvas could not be found.' });
  Drawing.clear(request.params.id);
  return response.json({ ok: true });
}