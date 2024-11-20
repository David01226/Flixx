import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-disclaimer container">
        <p>This project uses data from <a href="https://www.themoviedb.org/?language=en-GB" target="_blank">TMDB</a> and draws inspiration from Netflix and is for educational purposes only.</p>
      </div>
      <div className="container">
        <div className="logo"><span>FLIXX</span></div>
        <div className="social-links">
          <a href="https://www.themoviedb.org/">
          </a>
          <a href="https://www.facebook.com" target="_blank"
            ><i className="fab fa-facebook-f"></i
          ></a>
          <a href="https://www.twitter.com" target="_blank"
            ><i className="fab fa-twitter"></i
          ></a>
          <a href="https://www.instagram.com" target="_blank"
            ><i className="fab fa-instagram"></i
          ></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer