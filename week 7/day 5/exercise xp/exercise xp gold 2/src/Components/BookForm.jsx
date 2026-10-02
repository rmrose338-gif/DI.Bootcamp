import { useState } from 'react'

const emptyBook = {
  title: '',
  author: '',
  genre: '',
  year: '',
}

function BookForm() {
  const [book, setBook] = useState(emptyBook)
  const [submitted, setSubmitted] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setBook((currentBook) => ({ ...currentBook, [name]: value }))
    setSubmitted(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const bookData = { ...book }
    setBook(bookData)
    console.log(bookData)
    setSubmitted(true)
  }

  return (
    <div>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label className="field" htmlFor="book-title">
          <span>Book title</span>
          <input
            id="book-title"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </label>

        <label className="field" htmlFor="book-author">
          <span>Author</span>
          <input
            id="book-author"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </label>

        <label className="field" htmlFor="book-genre">
          <span>Genre</span>
          <input
            id="book-genre"
            name="genre"
            value={book.genre}
            onChange={handleChange}
            required
          />
        </label>

        <label className="field" htmlFor="book-year">
          <span>Publication year</span>
          <input
            id="book-year"
            name="year"
            type="number"
            min="0"
            max={new Date().getFullYear()}
            value={book.year}
            onChange={handleChange}
            required
          />
        </label>

        <button className="submit-button" type="submit">Add book</button>
      </form>

      {submitted && (
        <p className="success-message" role="status">
          Book added successfully.
        </p>
      )}
    </div>
  )
}

export default BookForm