import { Router } from 'express';
import { clearDrawing, createProject, getDrawing, listProjects } from '../controllers/drawingController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);
router.get('/', listProjects);
router.post('/', createProject);
router.get('/:id', getDrawing);
router.post('/:id/clear', clearDrawing);
export default router;