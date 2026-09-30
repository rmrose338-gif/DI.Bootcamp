const express = require('express');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parsing middleware
app.use(express.json());

// Mount the task router at /tasks
app.use('/tasks', taskRoutes);

// Handle 404 for unknown endpoints
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'Something went wrong on the server.'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Task Management API is running at http://localhost:${PORT}`);
});