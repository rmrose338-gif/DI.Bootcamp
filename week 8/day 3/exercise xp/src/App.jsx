import { createContext, useContext, useRef, useState } from 'react';

const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }
  return context;
}

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
      aria-pressed={theme === 'dark'}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {theme === 'light' ? '☾' : '☀'}
      </span>
      <span>{theme === 'light' ? 'Dark mode' : 'Light mode'}</span>
    </button>
  );
}

function CharacterCounter() {
  const inputRef = useRef(null);
  const [characterCount, setCharacterCount] = useState(0);

  function updateCount() {
    setCharacterCount(inputRef.current?.value.length ?? 0);
  }

  return (
    <section className="exercise" aria-labelledby="counter-title">
      <div className="exercise__heading">
        <span className="exercise__number">02</span>
        <div>
          <p className="eyebrow">Live input</p>
          <h2 id="counter-title">Character counter</h2>
        </div>
      </div>
      <label className="field-label" htmlFor="counter-input">Write something</label>
      <textarea
        id="counter-input"
        ref={inputRef}
        onInput={updateCount}
        placeholder="Your words will be counted as you type..."
        rows={5}
      />
      <div className="counter-readout" aria-live="polite">
        <span>Characters</span>
        <strong>{characterCount}</strong>
      </div>
    </section>
  );
}

function ExercisePage() {
  const { theme } = useTheme();

  return (
    <main className="page" data-theme={theme}>
      <header className="topbar">
        <a className="course-mark" href="#top" aria-label="Week 8 React hooks exercises">
          <span className="course-mark__dot" />
          <span>REACT / WEEK 08</span>
        </a>
        <ThemeSwitcher />
      </header>

      <div className="content" id="top">
        <section className="intro" aria-labelledby="page-title">
          <p className="eyebrow">Day 03 · Hook practice</p>
          <h1 id="page-title">State of<br />the interface.</h1>
          <p className="intro__copy">
            Two small exercises in sharing state and responding to input.
          </p>
        </section>

        <div className="exercise-list">
          <section className="exercise theme-exercise" aria-labelledby="theme-title">
            <div className="exercise__heading">
              <span className="exercise__number">01</span>
              <div>
                <p className="eyebrow">Shared preference</p>
                <h2 id="theme-title">Theme switcher</h2>
              </div>
            </div>
            <p className="exercise__description">
              The page reads the current theme from context. Change it here and the whole
              interface updates together.
            </p>
            <div className="theme-status" role="status">
              <span className="theme-status__swatch" aria-hidden="true" />
              <span>Currently using <strong>{theme}</strong> theme</span>
            </div>
          </section>

          <CharacterCounter />
        </div>

        <footer className="page-footer">
          <span>useContext</span>
          <span className="footer-divider" aria-hidden="true">/</span>
          <span>useState</span>
          <span className="footer-divider" aria-hidden="true">/</span>
          <span>useRef</span>
        </footer>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ExercisePage />
    </ThemeProvider>
  );
}