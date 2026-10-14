import AuthView from './components/AuthView.jsx'

function App() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Northstar home">
          <span className="brand-mark" aria-hidden="true">N</span>
          <span>NORTHSTAR<span className="brand-period">.</span></span>
        </a>
        <span className="topbar-caption">A calmer corner of the internet</span>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> PERSONAL SPACE / 2026</p>
          <h1>Come as<br />you <em>are.</em></h1>
          <p className="hero-description">A small place to land, gather your thoughts, and find your next step.</p>
          <div className="hero-footnote"><span>01</span><span>YOUR SPACE IS READY</span></div>
        </div>
        <AuthView />
      </section>

      <footer className="page-footer">
        <span>BUILT FOR THE NEXT CHAPTER</span>
        <span>TAKE YOUR TIME <i aria-hidden="true">✳</i></span>
      </footer>
    </main>
  )
}

export default App