const express = require('express');
require('dotenv').config();

const quizRoutes = require('./routes/quizRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// API Routes
app.use('/api/quiz', quizRoutes);

app.listen(PORT, () => {
  console.log(`Quiz API running on port ${PORT}`);
});