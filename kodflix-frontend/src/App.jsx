import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import MovieRow from './components/MovieRow'
import Signup from './pages/Signup'
import './App.css'

const API_KEY = 'cf03bbcb'
const OMDB_API = 'https://www.omdbapi.com'

// Movie categories to search
const CATEGORIES = [
  { title: 'Popular on KodFlix', search: 'marvel', isTopTen: false },
  { title: 'Top 10 in India Today', search: 'avengers', isTopTen: true },
  { title: 'Trending Now', search: 'action', isTopTen: false },
  { title: 'New Releases', search: '2024', isTopTen: false },
  { title: 'Action Movies', search: 'batman', isTopTen: false },
  { title: 'Sci-Fi', search: 'star wars', isTopTen: false },
  { title: 'Drama', search: 'drama', isTopTen: false }
]

// Home component
function Home() {
  const [movies, setMovies] = useState({})
  const [featuredMovie, setFeaturedMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    try {
      const moviesData = {}
      
      // Fetch movies for each category
      for (const category of CATEGORIES) {
        const response = await fetch(`${OMDB_API}/?s=${category.search}&apikey=${API_KEY}`)
        const data = await response.json()
        
        if (data.Search) {
          // Get detailed info for each movie
          const detailedMovies = await Promise.all(
            data.Search.slice(0, 10).map(async (movie) => {
              const detailResponse = await fetch(`${OMDB_API}/?i=${movie.imdbID}&apikey=${API_KEY}`)
              return detailResponse.json()
            })
          )
          moviesData[category.title] = detailedMovies
        }
      }

      setMovies(moviesData)
      
      // Set featured movie (first movie from first category)
      if (moviesData[CATEGORIES[0].title]?.length > 0) {
        setFeaturedMovie(moviesData[CATEGORIES[0].title][0])
      }
      
      setLoading(false)
    } catch (error) {
      console.error('Error fetching movies:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <>
      <Header />
      {featuredMovie && <Hero movie={featuredMovie} />}
      <div className="movie-rows">
        {CATEGORIES.map((category) => (
          movies[category.title] && (
            <MovieRow 
              key={category.title} 
              title={category.title} 
              movies={movies[category.title]}
              isTopTen={category.isTopTen}
            />
          )
        ))}
      </div>
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
