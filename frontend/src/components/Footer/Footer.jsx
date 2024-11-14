import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="main-footer">
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