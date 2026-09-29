const express = require('express');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes mounted on /users
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});