import { useState } from 'react'

function App() {
  const [languages, setLanguages] = useState([
    { name: 'Php', votes: 0 },
    { name: 'Python', votes: 0 },
    { name: 'JavaScript', votes: 0 },
    { name: 'Java', votes: 0 },
  ])

  const totalVotes = languages.reduce((total, language) => total + language.votes, 0)

  function voteFor(languageName) {
    setLanguages((currentLanguages) =>
      currentLanguages.map((language) =>
        language.name === languageName
          ? { ...language, votes: language.votes + 1 }
          : language,
      ),
    )
  }

  return (
    <main className="vote-page">
      <header className="page-header">
        <p className="eyebrow">Community poll</p>
        <h1>Choose your language</h1>
        <p className="intro">Cast a vote for the language you would pick up next.</p>
      </header>

      <section className="vote-board" aria-label="Programming language votes">
        <div className="board-heading">
          <h2>Current standings</h2>
          <p aria-live="polite">
            {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'} total
          </p>
        </div>

        <ol className="language-list">
          {languages.map((language, index) => (
            <li className="language-row" key={language.name}>
              <span className="rank">{String(index + 1).padStart(2, '0')}</span>
              <span className="language-name">{language.name}</span>
              <span className="vote-count" aria-label={`${language.votes} votes`}>
                {language.votes}
              </span>
              <button
                className="vote-button"
                type="button"
                onClick={() => voteFor(language.name)}
                aria-label={`Vote for ${language.name}`}
              >
                Vote
              </button>
            </li>
          ))}
        </ol>
      </section>
    </main>
  )
}

export default App