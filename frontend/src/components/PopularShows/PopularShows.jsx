import React from 'react'
import './PopularShows.css'

const PopularShows = ({ results }) => {
  return (
    <div id="popular-shows" className="grid">
      {results.map((show) => (
        <div key={show.id} className="card">
          <a href={`show-details?id=${show.id}`}>
            {show.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                className="card-img-top"
                alt={show.name}
              />
            ) : (
              <img
                src="../images/no-image.jpg"
                className="card-img-top"
                alt={show.name}
              />
            )}
          </a>
          <div className="card-body">
            <h5 className="card-title">{show.name}</h5>
            <p className="card-text">
              <small className="text-muted">Air Date: {show.first_air_date}</small>
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PopularShows