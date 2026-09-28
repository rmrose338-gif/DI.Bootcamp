const express = require('express');
const app = express();
const PORT = 3000;

// Middleware for parsing incoming JSON payloads
app.use(express.json());

// Import Routers
const mainRouter = require('./routes/index');
const todosRouter = require('./routes/todos');
const booksRouter = require('./routes/books');

// Mount Routers
app.use('/', mainRouter);
app.use('/todos', todosRouter);
app.use('/books', booksRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});