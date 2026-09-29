const express = require('express');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);

// Error Handling: 404 Not Found
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Server Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});