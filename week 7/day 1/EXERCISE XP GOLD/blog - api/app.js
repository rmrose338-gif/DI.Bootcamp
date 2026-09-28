const express = require('express');
const postsRouter = require('./routes/posts');

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount Posts Router at /posts
app.use('/posts', postsRouter);

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Blog API server listening at http://localhost:${PORT}`);
});