import React from 'react'
import './ShowInfo.css'


const ShowInfo = ({show, youtubeURL, trailerFound}) => {

  if (!show && !youtubeURL) {
    return <></>
  }

  return (
    <section className="container">
      <div className="back">
        <a className="btn" href="/shows">Back To Shows</a>
      </div>
      <div id="show-details">
        {trailerFound && (
          <div
            style={{
              height: "100vh",
              width: "100%",
              border: "2px solid red",
              overflow: "hidden",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: -1
            }}
          >
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
        )}
        <div className="details-top">
          <div>
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
          </div>
          <div>
            <h2>{show.name}</h2>
            <p>
              <i className="fas fa-star text-primary"></i>
              {show.vote_average.toFixed(1)} / 10
            </p>
            <p className="text-muted">Last Air Date: {show.last_air_date}</p>
            <p>{show.overview}</p>
            <h5>Genres</h5>
            <ul className="list-group">
              {show.genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
            <a href={show.homepage} target="_blank" rel="noopener noreferrer" className="btn">
              Visit Show Homepage
            </a>
          </div>
        </div>
        <div className="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li>
              <span className="text-secondary">Number of Episodes:</span> {show.number_of_episodes}
            </li>
            <li>
              <span className="text-secondary">Last Episode To Air:</span> {show.last_episode_to_air.name}
            </li>
            <li>
              <span className="text-secondary">Status:</span> {show.status}
            </li>
          </ul>
          <h4>Production Companies</h4>
          <div className="list-group">
            {show.production_companies.map((company) => (
              <span key={company.id}>{company.name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShowInfo