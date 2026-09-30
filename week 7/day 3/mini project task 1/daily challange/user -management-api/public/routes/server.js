import express from 'express';
import path from 'path';
import userRouter from './routes/users.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files
app.use(express.static(path.resolve('public')));

// Mount API routes
app.use('/api', userRouter);

// Default redirect to register page
app.get('/', (req, res) => {
  res.redirect('/register.html');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});