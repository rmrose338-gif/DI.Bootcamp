const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();
const tasksFilePath = path.join(__dirname, '../tasks.json');

// Helper function: Read tasks from JSON file
async function readTasks() {
  try {
    const data = await fs.readFile(tasksFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // If file doesn't exist, create it with an empty array
      await fs.writeFile(tasksFilePath, JSON.stringify([]));
      return [];
    }
    throw new Error('Failed to read task data');
  }
}

// Helper function: Write tasks to JSON file
async function writeTasks(tasks) {
  try {
    await fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2));
  } catch (error) {
    throw new Error('Failed to save task data');
  }
}

// GET /tasks - Retrieve all tasks
router.get('/', async (req, res, next) => {
  try {
    const tasks = await readTasks();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
});

// GET /tasks/:id - Retrieve a specific task by ID
router.get('/:id', async (req, res, next) => {
  try {
    const taskId = parseInt(req.params.id, 10);
    if (isNaN(taskId)) {
      return res.status(400).json({ error: 'Task ID must be a valid number.' });
    }

    const tasks = await readTasks();
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
      return res.status(404).json({ error: `Task with ID ${taskId} not found.` });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
});

// POST /tasks - Create a new task
router.post('/', async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;

    // Validation
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required and must be a non-empty string.' });
    }

    const tasks = await readTasks();

    const newTask = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      title: title.trim(),
      description: description ? String(description).trim() : '',
      completed: typeof completed === 'boolean' ? completed : false,
      createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    await writeTasks(tasks);

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
});

// PUT /tasks/:id - Update a task by ID
router.put('/:id', async (req, res, next) => {
  try {
    const taskId = parseInt(req.params.id, 10);
    if (isNaN(taskId)) {
      return res.status(400).json({ error: 'Task ID must be a valid number.' });
    }

    const { title, description, completed } = req.body;

    // Validation: ensure at least one field is provided for update
    if (title === undefined && description === undefined && completed === undefined) {
      return res.status(400).json({ error: 'Please provide title, description, or completed state to update.' });
    }

    if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
      return res.status(400).json({ error: 'Title must be a non-empty string.' });
    }

    if (completed !== undefined && typeof completed !== 'boolean') {
      return res.status(400).json({ error: 'Completed status must be a boolean.' });
    }

    const tasks = await readTasks();
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
      return res.status(404).json({ error: `Task with ID ${taskId} not found.` });
    }

    // Apply updates
    if (title !== undefined) tasks[taskIndex].title = title.trim();
    if (description !== undefined) tasks[taskIndex].description = String(description).trim();
    if (completed !== undefined) tasks[taskIndex].completed = completed;
    tasks[taskIndex].updatedAt = new Date().toISOString();

    await writeTasks(tasks);

    res.status(200).json(tasks[taskIndex]);
  } catch (error) {
    next(error);
  }
});

// DELETE /tasks/:id - Delete a task by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const taskId = parseInt(req.params.id, 10);
    if (isNaN(taskId)) {
      return res.status(400).json({ error: 'Task ID must be a valid number.' });
    }

    const tasks = await readTasks();
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
      return res.status(404).json({ error: `Task with ID ${taskId} not found.` });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];
    await writeTasks(tasks);

    res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    next(error);
  }
});

module.exports = router;