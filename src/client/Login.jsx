import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      // store token
      if (data.token) localStorage.setItem('token', data.token)
      setUser(data.user)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (user) {
    return (
      <div>
        <h2>Welcome</h2>
        <p>{user.email}</p>
        <button onClick={() => { localStorage.removeItem('token'); setUser(null); }}>Logout</button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
      <h2>Login</h2>
      <div>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
      </div>
      <div>
        <label>Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
      </div>
      <div>
        <button type="submit" disabled={loading}>{loading ? 'Logging...' : 'Login'}</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}
