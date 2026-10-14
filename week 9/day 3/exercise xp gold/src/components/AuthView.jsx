import { useSelector } from 'react-redux'
import Login from './Login.jsx'
import Logout from './Logout.jsx'

function AuthView() {
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  if (!isAuthenticated) {
    return (
      <section className="auth-card" aria-labelledby="welcome-heading">
        <div className="card-topline"><span>WELCOME</span><span>01 / 02</span></div>
        <div className="card-icon" aria-hidden="true">✳</div>
        <h2 id="welcome-heading">Good things<br />start <em>here.</em></h2>
        <p className="card-copy">Sign in to make this space yours.</p>
        <Login />
      </section>
    )
  }

  return (
    <section className="auth-card signed-in" aria-labelledby="account-heading">
      <div className="card-topline"><span>ACCOUNT</span><span>02 / 02</span></div>
      <div className="avatar" aria-hidden="true">{user?.name?.charAt(0).toUpperCase()}</div>
      <p className="signed-in-label">YOU'RE SIGNED IN</p>
      <h2 id="account-heading">Hello, <em>{user?.name}</em>.</h2>
      <p className="user-email">{user?.email}</p>
      <div className="account-note">
        <span className="live-dot" />
        <span>Your session is active on this device.</span>
      </div>
      <Logout />
    </section>
  )
}

export default AuthView