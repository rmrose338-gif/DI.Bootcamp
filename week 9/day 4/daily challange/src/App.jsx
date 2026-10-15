import AgeControls from './components/AgeControls.jsx'
import AgeDisplay from './components/AgeDisplay.jsx'

export default function App() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="wordmark" href="#home" aria-label="Age Tracker home">
          <span className="brand-mark" aria-hidden="true">a.</span>
          <span>AGE TRACKER</span>
        </a>
        <span className="edition">A STUDY IN SMALL CHANGES <span>01 / 01</span></span>
      </header>

      <section className="tracker" id="home" aria-labelledby="page-title">
        <div className="tracker-copy">
          <p className="eyebrow"><span className="eyebrow-mark" /> PERSONAL RECORD <span className="eyebrow-divider">/</span> LIVE</p>
          <h1 id="page-title">Time moves.<br /><em>You choose the count.</em></h1>
          <p className="intro">A tiny experiment in asynchronous time. Move your age one year at a time.</p>
        </div>

        <AgeDisplay />
        <AgeControls />

        <footer className="tracker-footer">
          <span><i aria-hidden="true" /> STATE IS HELD IN REDUX</span>
          <span>GOOD THINGS TAKE A MOMENT</span>
        </footer>
      </section>

      <div className="page-index" aria-hidden="true"><span>01</span><span className="index-rule" /><span>AGE / TIME</span></div>
    </main>
  )
}