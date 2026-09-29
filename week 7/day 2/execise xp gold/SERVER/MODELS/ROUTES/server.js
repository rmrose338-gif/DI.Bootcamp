const express = require('express');
require('dotenv').config();

const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});