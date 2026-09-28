// In-memory data store for blog posts
let posts = [
  {
    id: 1,
    title: 'My First Blog Post',
    content: 'Welcome to my blog! This is the very first post.',
    timestamp: new Date().toISOString()
  }
];

// Helper to create a new post object
const createPost = (title, content) => {
  const nextId = posts.length ? posts[posts.length - 1].id + 1 : 1;
  return {
    id: nextId,
    title,
    content,
    timestamp: new Date().toISOString()
  };
};

module.exports = {
  posts,
  createPost
};