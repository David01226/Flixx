import React from 'react'
import './SearchBar.css'

const Search = () => {
  return (
    <section className="search page-width">
      <div className="container">
        <div id="alert"></div>
        <form action="/search" className="search-form">
          <div className="search-radio">
            <input type="radio" id="movies" name="type" value="movie" defaultChecked />
            <label htmlFor="movies">Movies</label>
            <input type="radio" id="shows" name="type" value="tv" />
            <label htmlFor="shows">TV Shows</label>
          </div>
          <div className="search-flex">
            <input
              type="text"
              name="search-term"
              id="search-term"
              placeholder="Enter search term"
            />
            <button className="btn" type="submit">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Search