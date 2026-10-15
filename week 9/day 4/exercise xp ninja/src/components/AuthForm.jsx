import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/auth/authSlice.js'
import { loginUser } from '../features/auth/authThunks.js'

export default function AuthForm() {
  const dispatch = useDispatch()
  const { user, status, error } = useSelector((state) => state.auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    dispatch(loginUser({ email, password }))
  }

  if (user) {
    return (
      <div className="account-signed-in">
        <span className="account-initial" aria-hidden="true">{user.name[0]}</span>
        <span className="account-name">Hi, {user.name}</span>
        <button className="account-action" type="button" onClick={() => dispatch(logout())}>Sign out</button>
      </div>
    )
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="account-email">Email</label>
      <input
        id="account-email"
        type="email"
        autoComplete="email"
        placeholder="Email address"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <label className="sr-only" htmlFor="account-password">Password</label>
      <input
        id="account-password"
        type="password"
        autoComplete="current-password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Signing in...' : 'Sign in'}
      </button>
      {error && <span className="auth-error" role="alert">{error}</span>}
    </form>
  )
}