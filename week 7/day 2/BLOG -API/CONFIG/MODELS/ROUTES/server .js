const express = require('express');
const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parsing middleware
app.use(express.json());

// Routes
app.use('/posts', postRoutes);

// Error Handling: 404 Not Found (Invalid routes)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handling Middleware (Server errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});