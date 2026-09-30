const fs = require('fs');

// Helper function to safely load existing notes from JSON file
const fetchNotes = () => {
  try {
    const notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

// Helper function to save notes array to JSON file
const saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes, null, 2));
};

// Add a new note
const addNote = (title, body) => {
  const notes = fetchNotes();
  const note = { title, body };

  // Check if note title already exists
  const duplicateNotes = notes.filter((n) => n.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  } else {
    console.log('Note already exists');
  }
};

// List all notes
const getAll = () => {
  return fetchNotes();
};

// Read a specific note by title
const getNote = (title) => {
  const notes = fetchNotes();
  const foundNote = notes.find((note) => note.title === title);

  if (!foundNote) {
    console.log('Note not found');
  }
  return foundNote;
};

// Remove a note by title
const removeNote = (title) => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);
  return notes.length !== filteredNotes.length;
};

// Helper function to print note details cleanly
const logNote = (note) => {
  console.log('--');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};