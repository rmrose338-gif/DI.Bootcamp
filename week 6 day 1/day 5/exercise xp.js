const express = require('express');
const axios = require('axios');

// ============================================================================
// EXERCISE 1: Blog RESTful API (Port 3000)
// ============================================================================
const blogApp = express();
const BLOG_PORT = 3000;

blogApp.use(express.json());

let posts = [
  { id: 1, title: 'Introduction to Node.js', content: 'Node.js is an event-driven JS runtime.' },
  { id: 2, title: 'Understanding Express', content: 'Express makes web server routing simple.' }
];

// GET /posts - Return all blog posts
blogApp.get('/posts', (req, res) => {
  res.status(200).json(posts);
});

// GET /posts/:id - Return a specific post by ID
blogApp.get('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.status(200).json(post);
});

// POST /posts - Create a new post
blogApp.post('/posts', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const newPost = {
    id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
    title,
    content
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// PUT /posts/:id - Update an existing post
blogApp.put('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, content } = req.body;
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  if (title) post.title = title;
  if (content) post.content = content;

  res.status(200).json(post);
});

// DELETE /posts/:id - Delete a post
blogApp.delete('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const initialLength = posts.length;

  posts = posts.filter((p) => p.id !== id);

  if (posts.length === initialLength) {
    return res.status(404).json({ error: 'Post not found' });
  }

  res.status(200).json({ message: 'Post deleted successfully' });
});

// 404 Handler for invalid routes
blogApp.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// 500 Handler for server errors
blogApp.use((err, req, res, next) => {
  console.error('Blog API Error:', err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

blogApp.listen(BLOG_PORT, () => {
  console.log(`[Exercise 1] Blog API listening on http://localhost:${BLOG_PORT}`);
});

// ============================================================================
// EXERCISE 2: Book CRUD API (Port 5000)
// ============================================================================
const bookApp = express();
const BOOK_PORT = 5000;

bookApp.use(express.json());

const books = [
  { id: 1, title: '1984', author: 'George Orwell', publishedYear: 1949 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', publishedYear: 1960 },
  { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', publishedYear: 1925 }
];

// GET /api/books - Read all books
bookApp.get('/api/books', (req, res) => {
  res.status(200).json(books);
});

// GET /api/books/:bookId - Read a specific book by ID
bookApp.get('/api/books/:bookId', (req, res) => {
  const bookId = parseInt(req.params.bookId, 10);
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  res.status(200).json(book);
});

// POST /api/books - Create a new book
bookApp.post('/api/books', (req, res) => {
  const { title, author, publishedYear } = req.body;

  if (!title || !author || !publishedYear) {
    return res.status(400).json({ error: 'title, author, and publishedYear are required' });
  }

  const newBook = {
    id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
    title,
    author,
    publishedYear
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

bookApp.listen(BOOK_PORT, () => {
  console.log(`[Exercise 2] Book API listening on http://localhost:${BOOK_PORT}`);
});

// ============================================================================
// EXERCISE 3: External Data API via Axios (Port 5001)
// ============================================================================
// Note: Changed port to 5001 to prevent conflicts with Exercise 2 on Port 5000.

const dataService = {
  fetchPosts: async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
  }
};

const crudApp = express();
const CRUD_PORT = 5001;

crudApp.use(express.json());

// GET /posts - Fetch posts using dataService
crudApp.get('/posts', async (req, res) => {
  try {
    const postsData = await dataService.fetchPosts();
    console.log('Data successfully retrieved from JSONPlaceholder and sent as response.');
    res.status(200).json(postsData);
  } catch (error) {
    console.error('Error in dataService:', error.message);
    res.status(500).json({ error: 'Failed to fetch posts from external API' });
  }
});

crudApp.listen(CRUD_PORT, () => {
  console.log(`[Exercise 3] CRUD API (Axios Data Service) listening on http://localhost:${CRUD_PORT}`);
});