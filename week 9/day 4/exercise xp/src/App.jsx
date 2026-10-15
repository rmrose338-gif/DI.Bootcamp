import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from './redux/usersSlice.js'

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
}

function UserData() {
  const dispatch = useDispatch()
  const { user, status, error } = useSelector((state) => state.users)
  const isLoading = status === 'loading'

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  return (
    <main className="directory">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="People Index home">
          <span className="wordmark-mark" aria-hidden="true">P.</span>
          <span>PEOPLE INDEX</span>
        </a>
        <span className="topbar-note">A little directory of the internet</span>
        <span className="edition">ENTRY 001 <span aria-hidden="true">/</span> 2026</span>
      </header>

      <section className="profile" id="top" aria-labelledby="page-title">
        <div className="profile-heading">
          <p className="eyebrow"><span className="status-dot" /> USER RECORD <span className="eyebrow-divider">/</span> JSONPLACEHOLDER</p>
          <h1 id="page-title">The people<br />behind the data.</h1>
          <p className="intro">One profile, fetched live and filed here for reference.</p>
        </div>

        <div className="record-rule" />

        {isLoading && (
          <div className="message-state" role="status" aria-live="polite">
            <span className="loader" aria-hidden="true" />
            <span>Contacting the directory…</span>
          </div>
        )}

        {status === 'failed' && (
          <div className="message-state error-state" role="alert">
            <span className="error-mark" aria-hidden="true">!</span>
            <div>
              <h2>Couldn’t load this record.</h2>
              <p>{error}</p>
              <button className="text-button" type="button" onClick={() => dispatch(fetchUser())}>
                Try again <span aria-hidden="true">↗</span>
              </button>
            </div>
          </div>
        )}

        {user && status === 'succeeded' && (
          <article className="user-record" aria-label={`Profile for ${user.name}`}>
            <div className="identity">
              <div className="avatar" aria-hidden="true">{getInitials(user.name)}</div>
              <div>
                <p className="record-number">RECORD <span>NO. {String(user.id).padStart(3, '0')}</span></p>
                <h2>{user.name}</h2>
                <p className="handle">@{user.username}</p>
              </div>
              <a className="email-link" href={`mailto:${user.email}`}>
                <span className="email-label">SEND A NOTE</span>
                <span>{user.email} <span aria-hidden="true">↗</span></span>
              </a>
            </div>

            <dl className="details-grid">
              <div className="detail-item">
                <dt>COMPANY</dt>
                <dd>{user.company.name}</dd>
                <p>{user.company.catchPhrase}</p>
              </div>
              <div className="detail-item">
                <dt>LOCATION</dt>
                <dd>{user.address.city}</dd>
                <p>{user.address.street}, {user.address.suite}</p>
              </div>
              <div className="detail-item">
                <dt>ON THE WEB</dt>
                <dd><a href={`https://${user.website}`} target="_blank" rel="noreferrer">{user.website} <span aria-hidden="true">↗</span></a></dd>
                <p>{user.phone}</p>
              </div>
            </dl>
          </article>
        )}

        <div className="record-rule lower-rule" />

        <footer className="actions-row">
          <p><span className="live-dot" /> {status === 'succeeded' ? 'RECORD UP TO DATE' : 'DIRECTORY CONNECTION'}</p>
          <div className="actions">
            <button
              className="text-button"
              type="button"
              onClick={() => dispatch(fetchUser({ simulateFailure: true }))}
              disabled={isLoading}
            >
              Test error state <span aria-hidden="true">↗</span>
            </button>
            <button
              className="refresh-button"
              type="button"
              aria-label="Refresh user record"
              title="Refresh user record"
              onClick={() => dispatch(fetchUser())}
              disabled={isLoading}
            >
              <span aria-hidden="true">↻</span>
            </button>
          </div>
        </footer>
      </section>

      <div className="page-index" aria-hidden="true"><span>001</span><span className="index-line" /><span>PERSON / PROFILE</span></div>
    </main>
  )
}

export default UserData