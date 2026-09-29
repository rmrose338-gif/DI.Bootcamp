const pool = require('../config/db');

// GET /api/todos
exports.getAllTodos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching tasks' });
  }
};

// GET /api/todos/:id
exports.getTodoById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching task' });
  }
};

// POST /api/todos
exports.createTodo = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO tasks (title) VALUES ($1) RETURNING *',
      [title]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error while creating task' });
  }
};

// PUT /api/todos/:id
exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  if (title === undefined || completed === undefined) {
    return res.status(400).json({ error: 'Title and completed status are required' });
  }

  try {
    const result = await pool.query(
      'UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 RETURNING *',
      [title, completed, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error while updating task' });
  }
};

// DELETE /api/todos/:id
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error while deleting task' });
  }
};