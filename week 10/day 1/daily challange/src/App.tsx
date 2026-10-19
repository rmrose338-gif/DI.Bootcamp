import { useRef, useState, type FormEvent } from 'react'
import List from './components/List'
import type { Book } from './types/Book'
import './App.css'

const starterBooks: Book[] = [
  { id: 1, title: 'The Creative Act', author: 'Rick Rubin' },
  { id: 2, title: 'Braiding Sweetgrass', author: 'Robin Wall Kimmerer' },
  { id: 3, title: 'Tomorrow, and Tomorrow, and Tomorrow', author: 'Gabrielle Zevin' },
]

function BookApp() {
  const [books, setBooks] = useState<Book[]>(starterBooks)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const nextBookId = useRef(starterBooks.length + 1)

  function addBook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const cleanTitle = title.trim()
    const cleanAuthor = author.trim()
    if (!cleanTitle || !cleanAuthor) {
      setFormError('Add both a title and an author to save this book.')
      return
    }

    const newBook: Book = {
      id: nextBookId.current,
      title: cleanTitle,
      author: cleanAuthor,
    }
    nextBookId.current += 1
    setBooks((currentBooks) => [...currentBooks, newBook])
    setTitle('')
    setAuthor('')
    setFormError(null)
  }

  return (
    <main className="book-page">
      <header className="page-header">
        <p className="eyebrow">Week 10 · Day 1 · Daily Challenge</p>
        <h1>A little more <em>well-read.</em></h1>
        <p className="intro">
          Keep a growing shelf of books you love, want to read, or can’t stop
          recommending.
        </p>
        <div className="header-note">
          <span className="note-mark" aria-hidden="true">✳</span>
          <span>A collection in progress</span>
        </div>
      </header>

      <section className="shelf-section" aria-labelledby="shelf-heading">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Your collection</p>
            <h2 id="shelf-heading">On the bookshelf</h2>
          </div>
          <span className="book-count" aria-live="polite">
            {books.length} {books.length === 1 ? 'book' : 'books'}
          </span>
        </div>

        <List
          items={books}
          getKey={(book) => book.id}
          emptyMessage="Your shelf is waiting for its first book."
          renderItem={(book) => (
            <article className="book-card">
              <div className="book-spine" aria-hidden="true" />
              <div className="book-info">
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </div>
              <span className="book-id" aria-label={`Book number ${book.id}`}>
                {String(book.id).padStart(2, '0')}
              </span>
            </article>
          )}
        />
      </section>

      <section className="add-section" aria-labelledby="add-heading">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Make room on the shelf</p>
            <h2 id="add-heading">Add a book</h2>
          </div>
          <span className="add-mark" aria-hidden="true">+</span>
        </div>

        <form className="book-form" onSubmit={addBook}>
          <label>
            Book title
            <input
              type="text"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. The Left Hand of Darkness"
              required
            />
          </label>
          <label>
            Author
            <input
              type="text"
              name="author"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              placeholder="e.g. Ursula K. Le Guin"
              required
            />
          </label>
          {formError !== null && (
            <p className="form-error" role="alert">{formError}</p>
          )}
          <button className="add-button" type="submit">
            Add to my shelf <span aria-hidden="true">↗</span>
          </button>
        </form>
      </section>

      <footer className="page-footer">
        A generic list, a little TypeScript, and a growing stack of stories.
      </footer>
    </main>
  )
}

export default BookApp
