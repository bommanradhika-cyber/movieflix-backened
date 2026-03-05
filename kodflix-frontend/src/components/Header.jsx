import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-left">
        <Link to="/" className="logo-link">
          <h1 className="logo">KODFLIX</h1>
        </Link>
        <nav className="nav-links">
          <Link to="/" className="nav-link active">Home</Link>
          <a href="#" className="nav-link">TV Shows</a>
          <a href="#" className="nav-link">Movies</a>
          <a href="#" className="nav-link">New & Popular</a>
          <a href="#" className="nav-link">My List</a>
        </nav>
      </div>
      <div className="header-right">
        <div className="search-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="notification-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <Link to="/signup" className="signup-nav-button">
          Sign Up
        </Link>
        <div className="profile">
          <div className="profile-avatar"></div>
          <span className="profile-dropdown">▼</span>
        </div>
      </div>
    </header>
  )
}

export default Header
