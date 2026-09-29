const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const pool = new Pool({
  user: 'postgres',          // Replace with your DB user
  host: 'localhost',
  database: 'book_db',       // Replace with your DB name
  password: 'yourpassword',    // Replace with your DB password
  port: 5432,
});

const Book = {
  async getAll() {
    const result = await pool.query('SELECT * FROM books ORDER BY id ASC');
    return result.rows;
  },

  async getById(id) {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    return result.rows[0];
  },

  async create(title, author, publishedYear) {
    const result = await pool.query(
      'INSERT INTO books (title, author, "publishedYear") VALUES ($1, $2, $3) RETURNING *',
      [title, author, publishedYear]
    );
    return result.rows[0];
  }
};

app.get('/api/books', async (req, res, next) => {
  try {
    const books = await Book.getAll();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
});

app.get('/api/books/:bookId', async (req, res, next) => {
  try {
    const book = await Book.getById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
});

app.post('/api/books', async (req, res, next) => {
  try {
    const { title, author, publishedYear } = req.body;
    if (!title || !author || !publishedYear) {
      return res.status(400).json({ message: 'Title, author, and publishedYear are required' });
    }
    const newBook = await Book.create(title, author, publishedYear);
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
