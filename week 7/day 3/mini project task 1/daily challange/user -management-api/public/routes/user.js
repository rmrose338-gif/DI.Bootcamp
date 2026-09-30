import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcrypt';

const router = express.Router();
const USERS_FILE = path.resolve('users.json');

// Helper: Safely read users from JSON file
async function readUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(USERS_FILE, JSON.stringify([], null, 2));
      return [];
    }
    throw new Error('Error reading database file.');
  }
}

// Helper: Safely write users to JSON file
async function writeUsers(users) {
  try {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    throw new Error('Error writing to database file.');
  }
}

// POST /register
router.post('/register', async (req, res) => {
  try {
    const { name, lastName, email, username, password } = req.body;

    if (!name || !lastName || !email || !username || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const users = await readUsers();

    // Check if username already exists
    const existingUser = users.find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Check if password matches any existing user's hashed password
    for (const u of users) {
      const match = await bcrypt.compare(password, u.password);
      if (match) {
        return res.status(400).json({ error: 'Password already exists' });
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now().toString(),
      name,
      lastName,
      email,
      username,
      password: hashedPassword
    };

    users.push(newUser);
    await writeUsers(users);

    return res.status(201).json({ message: 'Hello Your account is created!' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const users = await readUsers();
    const user = users.find(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    );

    if (!user) {
      return res.status(400).json({ error: 'Username is not registered' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    return res.status(200).json({ message: `Hi ${user.username} welcome back again!` });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /users
router.get('/users', async (req, res) => {
  try {
    const users = await readUsers();
    // Return users without exposing password hashes
    const sanitizedUsers = users.map(({ password, ...user }) => user);
    return res.status(200).json(sanitizedUsers);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /users/:id
router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const users = await readUsers();
    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { password, ...sanitizedUser } = user;
    return res.status(200).json(sanitizedUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// PUT /users/:id
router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastName, email, username } = req.body;

    const users = await readUsers();
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    users[index] = {
      ...users[index],
      ...(name && { name }),
      ...(lastName && { lastName }),
      ...(email && { email }),
      ...(username && { username })
    };

    await writeUsers(users);

    const { password, ...updatedUser } = users[index];
    return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;