const Book = require('../models/bookModel');

// READ ALL: GET /api/books
exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.getAll();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

// READ BY ID: GET /api/books/:bookId
exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.getById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

// CREATE: POST /api/books
exports.createBook = async (req, res, next) => {
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
};

// UPDATE: PUT /api/books/:bookId
exports.updateBook = async (req, res, next) => {
  try {
    const { title, author, publishedYear } = req.body;
    if (!title || !author || !publishedYear) {
      return res.status(400).json({ message: 'Title, author, and publishedYear are required' });
    }
    const updatedBook = await Book.update(req.params.bookId, title, author, publishedYear);
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    next(error);
  }
};

// DELETE: DELETE /api/books/:bookId
exports.deleteBook = async (req, res, next) => {
  try {
    const deletedBook = await Book.delete(req.params.bookId);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    next(error);
  }
};