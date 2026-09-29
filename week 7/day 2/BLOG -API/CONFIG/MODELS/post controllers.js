const Post = require('../models/postModel');

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.getAll();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.getById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    const newPost = await Post.create(title, content);
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    const updatedPost = await Post.update(req.params.id, title, content);
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const deletedPost = await Post.delete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    next(error);
  }
};