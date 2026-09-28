const express = require('express');
const router = express.Router();

// In-memory data store for to-do items
let todos = [
  { id: 1, title: 'Learn Express.js', completed: false }
];

// GET /todos - Fetch all to-do items
router.get('/', (req, res) => {
  res.status(200).json(todos);
});

// POST /todos - Create a new to-do item
router.post('/', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTodo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    title,
    completed: false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /todos/:id - Update an existing to-do item by ID
router.put('/:id', (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const { title, completed } = req.body;

  const todo = todos.find(t => t.id === todoId);
  if (!todo) {
    return res.status(404).json({ error: 'To-Do item not found' });
  }

  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.status(200).json(todo);
});

// DELETE /todos/:id - Delete a to-do item by ID
router.delete('/:id', (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const initialLength = todos.length;

  todos = todos.filter(t => t.id !== todoId);

  if (todos.length === initialLength) {
    return res.status(404).json({ error: 'To-Do item not found' });
  }

  res.status(200).json({ message: `To-Do item ${todoId} deleted successfully` });
});

module.exports = router;