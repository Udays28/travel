import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../redux/authSlice'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status, error } = useSelector((state) => state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(login({ email, password })).unwrap()
      navigate('/')
    } catch (err) {
      console.error('Failed to log in: ', err)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" className="w-full bg-primary-600 text-white py-2 rounded" disabled={status === 'loading'}>
          {status === 'loading' ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default Login