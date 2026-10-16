import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  books: [
    { id: 1, title: 'The Haunting of Hill House', author: 'Shirley Jackson', genre: 'Horror' },
    { id: 2, title: 'Frankenstein', author: 'Mary Shelley', genre: 'Horror' },
    { id: 3, title: 'Mexican Gothic', author: 'Silvia Moreno-Garcia', genre: 'Horror' },
    { id: 4, title: 'The Hobbit', author: 'J. R. R. Tolkien', genre: 'Fantasy' },
    { id: 5, title: 'A Wizard of Earthsea', author: 'Ursula K. Le Guin', genre: 'Fantasy' },
    { id: 6, title: 'The Name of the Wind', author: 'Patrick Rothfuss', genre: 'Fantasy' },
    { id: 7, title: 'Dune', author: 'Frank Herbert', genre: 'Science Fiction' },
    { id: 8, title: 'Kindred', author: 'Octavia E. Butler', genre: 'Science Fiction' },
    { id: 9, title: 'The Left Hand of Darkness', author: 'Ursula K. Le Guin', genre: 'Science Fiction' },
    { id: 10, title: 'Piranesi', author: 'Susanna Clarke', genre: 'Fantasy' },
    { id: 11, title: 'Annihilation', author: 'Jeff VanderMeer', genre: 'Science Fiction' },
    { id: 12, title: 'Our Wives Under the Sea', author: 'Julia Armfield', genre: 'Horror' },
  ],
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
})

export default booksSlice.reducer