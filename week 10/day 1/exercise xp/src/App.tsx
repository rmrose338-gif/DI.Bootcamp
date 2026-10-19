import Greeting from './components/Greeting'
import Counter from './components/Counter'
import UserCard from './components/UserCard'
import UserList from './components/UserList'
import './App.css'

function App() {
  return (
    <main className="page-shell">
      <header className="hero">
        <p className="eyebrow">Week 10 · Day 1 · Exercise XP</p>
        <h1>React + TypeScript</h1>
        <p className="hero-copy">
          Five small exercises to practice typed props, state, and effects.
        </p>
        <div className="tech-stack" aria-label="Project technologies">
          <span>Vite</span>
          <span>React</span>
          <span>TypeScript</span>
        </div>
      </header>

      <div className="exercise-grid">
        <section className="exercise-panel greeting-panel">
          <div className="section-heading">
            <span className="exercise-number">01</span>
            <div>
              <p className="section-kicker">Typed props</p>
              <h2>Say hello</h2>
            </div>
          </div>
          <Greeting name="Alex" messageCount={3} />
        </section>

        <section className="exercise-panel">
          <div className="section-heading">
            <span className="exercise-number">02</span>
            <div>
              <p className="section-kicker">useState</p>
              <h2>Counter</h2>
            </div>
          </div>
          <Counter />
        </section>

        <section className="exercise-panel user-card-panel">
          <div className="section-heading">
            <span className="exercise-number">03</span>
            <div>
              <p className="section-kicker">Optional props</p>
              <h2>User cards</h2>
            </div>
          </div>
          <div className="user-card-list">
            <UserCard name="Sam Rivera" age={28} role="Frontend Developer" />
            <UserCard name="Taylor Chen" role="Designer" />
            <UserCard />
          </div>
        </section>

        <section className="exercise-panel user-list-panel">
          <div className="section-heading">
            <span className="exercise-number">04</span>
            <div>
              <p className="section-kicker">useEffect + fetch</p>
              <h2>Users from the API</h2>
            </div>
          </div>
          <UserList />
        </section>
      </div>

      <footer className="page-footer">
        Built with typed props, state, and effects.
      </footer>
    </main>
  )
}

export default App
