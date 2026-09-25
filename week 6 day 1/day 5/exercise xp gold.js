const express = require('express');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'supersecretkey123';

// ============================================================================
// EXERCISE 1: Intermediate CRUD API with Axios & JSONPlaceholder (Port 5000)
// ============================================================================
const app1 = express();
const PORT1 = 5000;

app1.use(express.json());

const JSONPLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com/posts';

// Read All Posts: GET /api/posts
app1.get('/api/posts', async (req, res) => {
  try {
    const response = await axios.get(JSONPLACEHOLDER_URL);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts', details: error.message });
  }
});

// Read Single Post: GET /api/posts/:id
app1.get('/api/posts/:id', async (req, res) => {
  try {
    const response = await axios.get(`${JSONPLACEHOLDER_URL}/${req.params.id}`);
    res.status(200).json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(500).json({ error: 'Failed to fetch post', details: error.message });
  }
});

// Create Post: POST /api/posts
app1.post('/api/posts', async (req, res) => {
  try {
    const response = await axios.post(JSONPLACEHOLDER_URL, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post', details: error.message });
  }
});

// Update Post: PUT /api/posts/:id
app1.put('/api/posts/:id', async (req, res) => {
  try {
    const response = await axios.put(`${JSONPLACEHOLDER_URL}/${req.params.id}`, req.body);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post', details: error.message });
  }
});

// Delete Post: DELETE /api/posts/:id
app1.delete('/api/posts/:id', async (req, res) => {
  try {
    await axios.delete(`${JSONPLACEHOLDER_URL}/${req.params.id}`);
    res.status(200).json({ message: `Post with ID ${req.params.id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post', details: error.message });
  }
});

app1.listen(PORT1, () => {
  console.log(`[Exercise 1] CRUD API with Axios listening on http://localhost:${PORT1}`);
});

// ============================================================================
// EXERCISE 2: User Login System with Express, Bcrypt & JWT (Port 5001)
// ============================================================================
// Note: Changed to Port 5001 to avoid port collisions with Exercise 1.

const app2 = express();
const PORT2 = 5001;

app2.use(express.json());

// In-memory user database
const users = [];

// Helper function: Password complexity validation
function validatePassword(password) {
  // Requires at least 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!\%*?&]{8,}$/;
  return passwordRegex.test(password);
}

// Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
}

// Role Authorization Middleware
function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied: Insufficient permissions' });
    }
    next();
  };
}

// User Registration: POST /api/register
app2.post('/api/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        error:
          'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
      });
    }

    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: users.length + 1,
      username,
      password: hashedPassword,
      role: role || 'user',
      failedLoginAttempts: 0,
      lockUntil: null
    };

    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
  } catch (error) {
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// User Login: POST /api/login
app2.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = users.find((u) => u.username === username);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Account Lockout Verification
    if (user.lockUntil && user.lockUntil > Date.now()) {
      const remainingSeconds = Math.ceil((user.lockUntil - Date.now()) / 1000);
      return res.status(429).json({
        error: `Account locked due to multiple failed login attempts. Try again in ${remainingSeconds} seconds.`
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      user.failedLoginAttempts += 1;
      if (user.failedLoginAttempts >= 3) {
        user.lockUntil = Date.now() + 2 * 60 * 1000; // Lock account for 2 minutes
        user.failedLoginAttempts = 0;
        return res.status(429).json({
          error: 'Account locked due to 3 consecutive failed attempts. Try again in 2 minutes.'
        });
      }
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Reset lockout counters on successful authentication
    user.failedLoginAttempts = 0;
    user.lockUntil = null;

    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  }
});

// User Profile (Protected Route): GET /api/profile
app2.get('/api/profile', authenticateToken, (req, res) => {
  res.status(200).json({
    message: 'Profile details retrieved successfully',
    user: req.user
  });
});

// Admin-Only Route (Role Bonus Feature): GET /api/admin
app2.get('/api/admin', authenticateToken, authorizeRoles('admin'), (req, res) => {
  res.status(200).json({ message: 'Welcome Admin! You have accessed an admin-restricted endpoint.' });
});

app2.listen(PORT2, () => {
  console.log(`[Exercise 2] User Login System listening on http://localhost:${PORT2}`);
});

// ============================================================================
// EXERCISE 3: Todo List API (Port 5002)
// ============================================================================
// Note: Changed to Port 5002 to avoid port collisions.

const app3 = express();
const PORT3 = 5002;

app3.use(express.json());

let todos = [
  { id: 1, title: 'Learn Express.js', completed: true },
  { id: 2, title: 'Build a REST API', completed: false }
];

// Create Todo: POST /api/todos
app3.post('/api/todos', (req, res) => {
  const { title, completed } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Valid title is required' });
  }

  const newTodo = {
    id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
    title: title.trim(),
    completed: typeof completed === 'boolean' ? completed : false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Get All Todos: GET /api/todos
app3.get('/api/todos', (req, res) => {
  res.status(200).json(todos);
});

// Get Specific Todo: GET /api/todos/:id
app3.get('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  res.status(200).json(todo);
});

// Update Todo: PUT /api/todos/:id
app3.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, completed } = req.body;

  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = Boolean(completed);

  res.status(200).json(todo);
});

// Delete Todo: DELETE /api/todos/:id
app3.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const initialLength = todos.length;

  todos = todos.filter((t) => t.id !== id);

  if (todos.length === initialLength) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  res.status(200).json({ message: 'Todo deleted successfully' });
});

app3.listen(PORT3, () => {
  console.log(`[Exercise 3] Todo List API listening on http://localhost:${PORT3}`);
});