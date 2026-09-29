const pool = require('../config/db');

const Book = {
  async getAll() {
    const result = await pool.query('SELECT * FROM books ORDER BY id ASC');
    return result.rows;
  },

  async getById(id) {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    return result.rows[0];
  },

  async create(title, author, publishedYear) {
    const result = await pool.query(
      'INSERT INTO books (title, author, "publishedYear") VALUES ($1, $2, $3) RETURNING *',
      [title, author, publishedYear]
    );
    return result.rows[0];
  },

  async update(id, title, author, publishedYear) {
    const result = await pool.query(
      'UPDATE books SET title = $1, author = $2, "publishedYear" = $3 WHERE id = $4 RETURNING *',
      [title, author, publishedYear, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await pool.query(
      'DELETE FROM books WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }
};

module.exports = Book;