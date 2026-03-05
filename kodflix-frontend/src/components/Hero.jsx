import React from 'react'
import './Hero.css'

// High quality background images for featured movies
const HERO_BACKGROUNDS = {
  'Captain Marvel': 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop',
  'Avengers': 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1920&h=1080&fit=crop',
  'default': 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop'
}

function Hero({ movie }) {
  if (!movie) return null

  // Get a high quality background based on movie title or use default
  const getBackground = () => {
    const title = movie.Title || ''
    if (title.includes('Captain') || title.includes('Marvel')) return HERO_BACKGROUNDS['Captain Marvel']
    if (title.includes('Avengers')) return HERO_BACKGROUNDS['Avengers']
    return HERO_BACKGROUNDS['default']
  }

  return (
    <div className="hero" style={{
      backgroundImage: `linear-gradient(to bottom, rgba(20,20,20,0) 0%, rgba(20,20,20,0.3) 40%, rgba(20,20,20,0.8) 80%, rgba(20,20,20,1) 100%), url(${getBackground()})`
    }}>
      <div className="hero-content">
        <div className="hero-series-badge">
          <span className="series-n">N</span>
          <span className="series-text">SERIES</span>
        </div>
        <h1 className="hero-title">{movie.Title}</h1>
        <div className="hero-meta">
          <span className="hero-rating">⭐ {movie.imdbRating || '8.0'}</span>
          <span className="hero-year">{movie.Year}</span>
          <span className="hero-runtime">{movie.Runtime || '120 min'}</span>
          <span className="hero-genre">{movie.Genre?.split(',')[0] || 'Action'}</span>
        </div>
        <p className="hero-description">
          {movie.Plot || 'No description available.'}
        </p>
        <div className="hero-buttons">
          <button className="hero-button play-button">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Play
          </button>
          <button className="hero-button info-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            More Info
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero
