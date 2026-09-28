const express = require('express');
const router = express.Router();
let { posts, createPost } = require('../models/postModel');

// GET /posts - Retrieve all blog posts
router.get('/', (req, res) => {
  res.status(200).json(posts);
});

// GET /posts/:id - Retrieve a specific blog post by ID
router.get('/:id', (req, res) => {
  const postId = parseInt(req.params.id, 10);

  if (isNaN(postId)) {
    return res.status(400).json({ error: 'Invalid post ID format' });
  }

  const post = posts.find(p => p.id === postId);
  if (!post) {
    return res.status(404).json({ error: `Blog post with ID ${postId} not found` });
  }

  res.status(200).json(post);
});

// POST /posts - Create a new blog post
router.post('/', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Both title and content are required' });
  }

  const newPost = createPost(title, content);
  posts.push(newPost);

  res.status(201).json(newPost);
});

// PUT /posts/:id - Update a blog post by ID
router.put('/:id', (req, res) => {
  const postId = parseInt(req.params.id, 10);

  if (isNaN(postId)) {
    return res.status(400).json({ error: 'Invalid post ID format' });
  }

  const post = posts.find(p => p.id === postId);
  if (!post) {
    return res.status(404).json({ error: `Blog post with ID ${postId} not found` });
  }

  const { title, content } = req.body;

  if (!title && !content) {
    return res.status(400).json({ error: 'At least one field (title or content) is required to update' });
  }

  if (title !== undefined) post.title = title;
  if (content !== undefined) post.content = content;
  post.timestamp = new Date().toISOString(); // Update timestamp on edit

  res.status(200).json(post);
});

// DELETE /posts/:id - Delete a blog post by ID
router.delete('/:id', (req, res) => {
  const postId = parseInt(req.params.id, 10);

  if (isNaN(postId)) {
    return res.status(400).json({ error: 'Invalid post ID format' });
  }

  const initialLength = posts.length;
  posts = posts.filter(p => p.id !== postId);

  if (posts.length === initialLength) {
    return res.status(404).json({ error: `Blog post with ID ${postId} not found` });
  }

  res.status(200).json({ message: `Blog post with ID ${postId} successfully deleted` });
});

module.exports = router;