import BookForm from './Components/BookForm.jsx'
import ContactForm from './Components/ContactForm.jsx'

function App() {
  return (
    <main className="page">
      <header className="page-header">
        <p className="eyebrow">React practice · Week 7, Day 5</p>
        <h1>Working with form data</h1>
      </header>

      <div className="exercise-list">
        <section className="exercise" aria-labelledby="book-heading">
          <div className="section-heading">
            <span className="exercise-number">01</span>
            <h2 id="book-heading">Add a book</h2>
          </div>
          <BookForm />
        </section>

        <section className="exercise" aria-labelledby="contact-heading">
          <div className="section-heading">
            <span className="exercise-number">02</span>
            <h2 id="contact-heading">Contact details</h2>
          </div>
          <ContactForm />
        </section>
      </div>
    </main>
  )
}

export default App