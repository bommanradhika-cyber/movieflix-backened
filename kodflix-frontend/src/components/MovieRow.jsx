import React, { useRef } from 'react'
import './MovieRow.css'

function MovieRow({ title, movies, isTopTen = false }) {
  const rowRef = useRef(null)

  const scroll = (direction) => {
    if (rowRef.current) {
      const { current } = rowRef
      const scrollAmount = direction === 'left' ? -current.clientWidth : current.clientWidth
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className={`movie-row ${isTopTen ? 'top-ten-row' : ''}`}>
      <h2 className="row-title">{title}</h2>
      <div className="row-container">
        <button 
          className="scroll-button scroll-left" 
          onClick={() => scroll('left')}
        >
          ‹
        </button>
        
        <div className="movie-list" ref={rowRef}>
          {movies?.map((movie, index) => (
            <div key={movie.imdbID || index} className="movie-card">
              <div className="movie-poster-container">
                <img 
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450/333/666?text=No+Image'} 
                  alt={movie.Title}
                  className="movie-poster"
                  loading="lazy"
                />
                <div className="movie-overlay">
                  <h3 className="movie-title-overlay">{movie.Title}</h3>
                  <div className="movie-info">
                    <span className="movie-rating">⭐ {movie.imdbRating || 'N/A'}</span>
                    <span className="movie-year">{movie.Year}</span>
                  </div>
                  <p className="movie-plot">
                    {movie.Plot?.substring(0, 100)}...
                  </p>
                  <div className="movie-buttons">
                    <button className="movie-play-btn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </button>
                    <button className="movie-add-btn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="scroll-button scroll-right" 
          onClick={() => scroll('right')}
        >
          ›
        </button>
      </div>
    </div>
  )
}

export default MovieRow
