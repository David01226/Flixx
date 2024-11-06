import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <header className="main-header">
    <div className="container">
      <div className="logo"><a href="/">FLIXX</a></div>
      <nav>
        <ul>
          <li>
            <a className="nav-link" href="/">Movies</a>
          </li>
          <li>
            <a className="nav-link" href="/shows.html">TV Shows</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  )
}

export default Header