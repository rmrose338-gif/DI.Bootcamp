import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser, setUser } from '../redux/authSlice.js'

function Login() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()

  function handleSubmit(event) {
    event.preventDefault()
    const user = {
      id: email.trim().toLowerCase(),
      name: name.trim(),
      email: email.trim(),
    }

    dispatch(setUser(user))
    dispatch(loginUser())
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label htmlFor="name">Your name</label>
      <input
        id="name"
        name="name"
        type="text"
        autoComplete="name"
        placeholder="How should we address you?"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
        maxLength={60}
      />

      <label htmlFor="email">Email address</label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />

      <button className="primary-button" type="submit">
        Continue <span aria-hidden="true">↗</span>
      </button>
      <p className="form-note">Demo sign-in only. No password or account is required.</p>
    </form>
  )
}

export default Login