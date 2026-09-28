const express = require('express');
const router = express.Router();

// In-memory data store for books
let books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' }
];

// GET /books - Fetch all books
router.get('/', (req, res) => {
  res.status(200).json(books);
});

// POST /books - Add a new book
router.post('/', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Both title and author are required' });
  }

  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id - Update a book by ID
router.put('/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const { title, author } = req.body;

  const book = books.find(b => b.id === bookId);
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  if (title !== undefined) book.title = title;
  if (author !== undefined) book.author = author;

  res.status(200).json(book);
});

// DELETE /books/:id - Delete a book by ID
router.delete('/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const initialLength = books.length;

  books = books.filter(b => b.id !== bookId);

  if (books.length === initialLength) {
    return res.status(404).json({ error: 'Book not found' });
  }

  res.status(200).json({ message: `Book ${bookId} deleted successfully` });
});

module.exports = router;