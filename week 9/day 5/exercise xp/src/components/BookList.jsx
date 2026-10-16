import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  selectBooks,
  selectFantasyBooks,
  selectHorrorBooks,
  selectScienceFictionBooks,
} from '../redux/selectors.js'

const collections = [
  { id: 'all', label: 'All books', selector: selectBooks },
  { id: 'Horror', label: 'Horror', selector: selectHorrorBooks },
  { id: 'Fantasy', label: 'Fantasy', selector: selectFantasyBooks },
  { id: 'Science Fiction', label: 'Science fiction', selector: selectScienceFictionBooks },
]

function BookList() {
  const [activeCollection, setActiveCollection] = useState('all')
  const selectedCollection = collections.find(({ id }) => id === activeCollection)
  const books = useSelector(selectedCollection.selector)
  const totalBooks = useSelector(selectBooks).length

  return (
    <main className="inventory-shell">
      <header className="masthead">
        <a className="brand" href="#inventory" aria-label="Page and Spine home">
          <span className="brand-mark" aria-hidden="true">P<span>&amp;</span>S</span>
          <span className="brand-name">PAGE <span>&amp;</span> SPINE</span>
        </a>
        <p className="masthead-note">A small, well-loved collection</p>
        <p className="edition">FIELD NOTES <span>/</span> NO. 09</p>
      </header>

      <section className="inventory" id="inventory" aria-labelledby="page-title">
        <div className="intro-row">
          <div>
            <p className="eyebrow"><span className="eyebrow-mark" /> THE READING ROOM <span className="slash">/</span> INVENTORY</p>
            <h1 id="page-title">Stories worth<br /><em>keeping close.</em></h1>
          </div>
          <p className="intro-copy">Browse a shelf of strange worlds, shadowed houses, and futures just around the corner.</p>
        </div>

        <div className="shelf-heading">
          <div>
            <span className="section-kicker">THE COLLECTION</span>
            <span className="book-total">{String(totalBooks).padStart(2, '0')} TITLES</span>
          </div>
          <span className="shelf-index">SHELF A <span>/</span> 2026</span>
        </div>

        <div className="collection-tabs" role="tablist" aria-label="Filter books by genre">
          {collections.map(({ id, label }) => (
            <button
              key={id}
              className={`collection-tab${activeCollection === id ? ' is-active' : ''}`}
              type="button"
              role="tab"
              id={`tab-${id.replaceAll(' ', '-')}`}
              aria-selected={activeCollection === id}
              aria-controls="book-results"
              onClick={() => setActiveCollection(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="book-list" id="book-results" role="tabpanel" aria-labelledby={`tab-${activeCollection.replaceAll(' ', '-')}`}>
          {books.map((book, index) => (
            <article className="book-row" key={book.id}>
              <span className="book-number">{String(index + 1).padStart(2, '0')}</span>
              <div className="book-title-block">
                <h2>{book.title}</h2>
                <p>{book.author}</p>
              </div>
              <span className={`genre-tag genre-${book.genre.toLowerCase().replaceAll(' ', '-')}`}>
                {book.genre}
              </span>
              <span className="row-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>

        <footer className="inventory-footer">
          <span>SHOWING {String(books.length).padStart(2, '0')} OF {String(totalBooks).padStart(2, '0')} TITLES</span>
          <span className="footer-rule" />
          <span>KEEP TURNING PAGES <span aria-hidden="true">✳</span></span>
        </footer>
      </section>
    </main>
  )
}

export default BookList