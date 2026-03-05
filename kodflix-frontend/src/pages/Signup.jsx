import React, { useState } from 'react'
import { authAPI } from '../services/api'
import './Signup.css'

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const userData = {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      }

      const result = await authAPI.register(userData)
      setSuccess('Account created successfully! Redirecting to login...')
      
      // Clear form
      setFormData({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      })

      // Redirect to home after 2 seconds
      setTimeout(() => {
        window.location.href = '/home'
      }, 2000)

    } catch (err) {
      setError(err.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-background"></div>
      <div className="signup-overlay"></div>
      
      <header className="signup-header">
        <h1 className="signup-logo">KODFLIX</h1>
      </header>

      <div className="signup-container">
        <div className="signup-box">
          <h2 className="signup-title">Sign Up</h2>
          
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                className="form-input"
              />
            </div>

            <button 
              type="submit" 
              className="signup-button"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="signup-footer">
            <p>Already have an account? <a href="/home" className="signup-link">Browse as Guest</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
