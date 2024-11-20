import React from 'react'

const ShowInfo = ({show, youtubeURL, videoTitle}) => {

  if (!show) {
    return <></>
  }

  return (
    <>
      <div className="backdrop-wrapper">
        {show.backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
            className="media-details__backdrop"
            alt={show.title}
          />
        ) : 
          <></>
        }
      </div>
      <section className="media-details container">
        {/* <div className="back">
          <a className="btn" href="/shows">Back To Shows</a>
        </div> */}
        <div className="details-top">
          <div className="details-top__poster">
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
          <div className="details-top__meta">
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
          <div className="details-top__vid-wrap">
            <h2>Show {videoTitle}</h2>
            <div className="details-top__vid">
              {youtubeURL && (
                <iframe
                  width="100%"
                  height="100%"
                  src={youtubeURL}
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
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
            {show.production_companies.map((company, i) => (
              <span key={i}>
                {company.name}
                {i < show.production_companies.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default ShowInfo