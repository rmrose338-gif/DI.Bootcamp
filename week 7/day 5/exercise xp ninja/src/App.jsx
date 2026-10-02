import Clock from './Components/Clock.jsx'
import Form from './Components/Form.jsx'

function App() {
  return (
    <main className="page">
      <header className="page-header">
        <p className="eyebrow">React practice · Week 7, Day 5</p>
        <h1>Time and validation</h1>
      </header>

      <div className="exercise-list">
        <section className="exercise" aria-labelledby="clock-heading">
          <div className="section-heading">
            <span className="exercise-number">01</span>
            <h2 id="clock-heading">Local time</h2>
          </div>
          <Clock />
        </section>

        <section className="exercise" aria-labelledby="form-heading">
          <div className="section-heading">
            <span className="exercise-number">02</span>
            <h2 id="form-heading">Form validation</h2>
          </div>
          <Form />
        </section>
      </div>
    </main>
  )
}

export default App