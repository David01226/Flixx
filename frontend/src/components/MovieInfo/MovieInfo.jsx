import React from 'react'
import './MovieInfo.css'


const MovieInfo = ({movie, youtubeURL}) => {
console.log(movie)
  function addCommasToNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  if (!movie && !youtubeURL) {
    return <></>
  }

  return (
    <>
      <div className="backdrop-wrapper">
        {movie.backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            className="movie-details__backdrop"
            alt={movie.title}
          />
        ) : 
          <></>
        }
      </div>
      <section className="movie-details page-width">
        {/* <div className="back">
          <a className="btn" href="/">Back To Movies</a>
        </div> */}
        <div className="details-top">
          <div className="details-top__poster">
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
          <div className="details-top__meta">
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
            <a href={movie.homepage} target="_blank" rel="noopener noreferrer" className="more-info-btn btn ">
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
              <span key={i}>
                {company.name}
                {i < movie.production_companies.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default MovieInfo