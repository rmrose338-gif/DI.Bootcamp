const express = require('express');
const router = express.Router();

// GET /
router.get('/', (req, res) => {
  res.send('Welcome to the Homepage!');
});

// GET /about
router.get('/about', (req, res) => {
  res.send('About Us Page');
});

module.exports = router;