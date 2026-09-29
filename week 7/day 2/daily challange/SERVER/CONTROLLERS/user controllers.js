const pool = require('../CONFIG/Db');
const bcrypt = require('bcrypt');

// POST /register (Uses Transaction)
exports.registerUser = async (req, res) => {
  const { username, password, email, first_name, last_name } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: 'Username, password, and email are required' });
  }

  let client;

  try {
    client = await pool.connect();
    await client.query('BEGIN'); // Start transaction

    // 1. Insert into users table
    const userQuery = `
      INSERT INTO users (username, email, first_name, last_name)
      VALUES ($1, $2, $3, $4)
      RETURNING id, username, email, first_name, last_name;
    `;
    const userResult = await client.query(userQuery, [
      username,
      email,
      first_name || null,
      last_name || null,
    ]);
    const newUser = userResult.rows[0];

    // 2. Hash password & insert into hashpwd table
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const pwdQuery = `
      INSERT INTO hashpwd (username, password)
      VALUES ($1, $2);
    `;
    await client.query(pwdQuery, [username, hashedPassword]);

    await client.query('COMMIT'); // Commit transaction
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    if (client) await client.query('ROLLBACK'); // Rollback on error
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    res.status(500).json({ error: 'Server error during registration' });
  } finally {
    if (client) client.release(); // Safe connection release
  }
};

// POST /login
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const result = await pool.query('SELECT password FROM hashpwd WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const hashedPassword = result.rows[0].password;
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: 'Server error during login' });
  }
};

// GET /users
exports.getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, username, first_name, last_name FROM users ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// GET /users/:id
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT id, email, username, first_name, last_name FROM users WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    if (err.code === '22P02') {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    res.status(500).json({ error: 'Error fetching user' });
  }
};

// PUT /users/:id
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, first_name, last_name } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users 
       SET email = COALESCE($1, email),
           first_name = COALESCE($2, first_name),
           last_name = COALESCE($3, last_name)
       WHERE id = $4
       RETURNING id, email, username, first_name, last_name`,
      [email, first_name, last_name, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    if (err.code === '22P02') {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Email already in use' });
    }
    res.status(500).json({ error: 'Failed to update user' });
  }
};