import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../backend/data');
fs.mkdirSync(directory, { recursive: true });

export const db = new DatabaseSync(path.join(directory, 'studio.sqlite'));
db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;');
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE COLLATE NOCASE,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    owner_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS projects_owner_updated ON projects(owner_id, updated_at DESC);

  CREATE TABLE IF NOT EXISTS drawings (
    project_id TEXT PRIMARY KEY REFERENCES projects(id) ON DELETE CASCADE,
    strokes TEXT NOT NULL DEFAULT '[]',
    updated_at TEXT NOT NULL
  );
`);

const projectColumns = db.prepare('PRAGMA table_info(projects)').all();
if (!projectColumns.some((column) => column.name === 'board_type')) {
  db.exec("ALTER TABLE projects ADD COLUMN board_type TEXT NOT NULL DEFAULT 'free'");
}

const existingUsers = db.prepare('SELECT id, name FROM users ORDER BY created_at, id').all();
const reservedNames = new Set(existingUsers.map((user) => user.name.toLowerCase()));
const seenNames = new Set();
const renameUser = db.prepare('UPDATE users SET name = ? WHERE id = ?');
for (const user of existingUsers) {
  const normalizedName = user.name.toLowerCase();
  if (!seenNames.has(normalizedName)) {
    seenNames.add(normalizedName);
    continue;
  }
  let suffix = 2;
  let uniqueName;
  do {
    const suffixText = `-${suffix++}`;
    uniqueName = `${user.name.slice(0, 40 - suffixText.length)}${suffixText}`;
  } while (reservedNames.has(uniqueName.toLowerCase()));
  renameUser.run(uniqueName, user.id);
  reservedNames.add(uniqueName.toLowerCase());
  seenNames.add(uniqueName.toLowerCase());
}
db.exec('CREATE UNIQUE INDEX IF NOT EXISTS users_name_unique ON users(name COLLATE NOCASE)');