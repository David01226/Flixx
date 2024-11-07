import React from 'react'
import './PopularMovies.css'

const PopularMovies = ({ results }) => {
  return (
    <section className="container">
      <h2>Popular Movies</h2>
      <div id="popular-movies" className="grid">
        {results.map((movie) => (
          <div key={movie.id} className="card">
            <a href={`movie?id=${movie.id}`}>
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top"
                  alt={movie.title}
                />
              ) : (
                <img
                  src="../images/no-image.jpg"
                  className="card-img-top"
                  alt={movie.title}
                />
              )}
            </a>
            <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
              <p className="card-text">
                <small className="text-muted">Release: {movie.release_date}</small>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PopularMovies