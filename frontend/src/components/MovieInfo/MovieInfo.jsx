import React from 'react'
import './MovieInfo.css'


const MovieInfo = ({movie, youtubeURL}) => {

  function addCommasToNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  if (!movie && !youtubeURL) {
    return <></>
  }

  return (
    <section className="container">
      <div className="back">
        <a className="btn" href="/">Back To Movies</a>
      </div>
      <div id="movie-details">
        <div style={{
          height: "100vh",
          width: "100%",
          border: "2px solid red",
          overflow: "hidden",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1
        }}>
          <iframe
            style={{ transform: "scale(1.5)" }}
            width="100%"
            height="100%"
            src={`${youtubeURL}?rel=0&autoplay=1&mute=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="details-top">
          <div>
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
          </div>
          <div>
            <h2>{movie.title}</h2>
            <p>
              <i className="fas fa-star text-primary"></i>
              {movie.vote_average.toFixed(1)} / 10
            </p>
            <p className="text-muted">Release Date: {movie.release_date}</p>
            <p>{movie.overview}</p>
            <h5>Genres</h5>
            <ul className="list-group">
              {movie.genres.map((genre, i) => (
                <li key={i}>{genre.name}</li>
              ))}
            </ul>
            <a href={movie.homepage} target="_blank" rel="noopener noreferrer" className="btn">
              Visit Movie Homepage
            </a>
          </div>
        </div>

        <div className="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span className="text-secondary">Budget:</span> ${addCommasToNumber(movie.budget)}</li>
            <li><span className="text-secondary">Revenue:</span> ${addCommasToNumber(movie.revenue)}</li>
            <li><span className="text-secondary">Runtime:</span> {movie.runtime} minutes</li>
            <li><span className="text-secondary">Status:</span> {movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div className="list-group">
            {movie.production_companies.map((company, i) => (
              <span key={i}>{company.name}</span>
            )).join(", ")}
          </div>
        </div>
      </div>
    </section>


  )
}

export default MovieInfo