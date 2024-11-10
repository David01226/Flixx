import React, { useEffect, useState, useRef } from 'react';
import './FeaturedMedia.css';
import { fetchAPIData } from '../../utils/apiService';

const FeaturedMedia = ({ results }) => {
  const [movie, setMovie] = useState(null);
  const [movieId, setMovieId] = useState(null);
  const [youtubeURL, setYoutubeURL] = useState(null);
  const [showBackdrop, setShowBackdrop] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (results && results.length > 0) {
      setMovie(results[2]);
      setMovieId(results[2].id);
    }
  }, [results]);

  useEffect(() => {
    const fetchVideoData = async () => {
      if (!movieId) return;

      try {
        const videoData = await fetchAPIData(`movie/${movieId}/videos`);
        const videos = videoData.results;
        const trailer = videos.find(video => video.type === 'Trailer');
        if (trailer) {
          setYoutubeURL(`https://www.youtube.com/embed/${trailer.key}`);
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchVideoData();
  }, [movieId]);

  // Hide backdrop and play video after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowBackdrop(false), 3000);
    return () => clearTimeout(timer);
  }, [youtubeURL]);

  // Listen for video end (assuming 2 seconds left)
  useEffect(() => {
    const checkVideoTime = () => {
      const player = iframeRef.current?.contentWindow;
      if (player) {
        player.postMessage('{"event":"listening"}', '*');
        const interval = setInterval(() => {
          player.postMessage('{"event":"getCurrentTime"}', '*');
        }, 1000);
        
        window.addEventListener('message', (event) => {
          if (event.origin !== 'https://www.youtube.com') return;
          const data = JSON.parse(event.data);
          if (data.event === 'currentTime' && data.info >= data.info.duration - 2) {
            setShowBackdrop(true);
            clearInterval(interval);
          }
        });

        return () => clearInterval(interval);
      }
    };

    if (iframeRef.current) {
      iframeRef.current.onload = checkVideoTime;
    }
  }, [youtubeURL]);

  const toggleMute = () => {
    setIsMuted(prevState => !prevState);
  } 

  return (
    <div className="featured-media">
      <div className="featured-media__media-wrap">
        {youtubeURL && !showBackdrop && (
          <iframe
            ref={iframeRef}
            width="100%"
            height="100%"
            src={`${youtubeURL}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
        {movie && showBackdrop && (
          <img
            className="featured-media__backdrop-img"
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.title}
          />
        )}
        {movie && (
          <div className="featured-media__meta">
            <h2>{movie.title}</h2>
            <div className="featured-media__description">{movie.overview}</div>
            <div className="featured-media__ctas">
              <a className="btn play-btn" href="/">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" data-icon="PlayStandard" aria-hidden="true">
                  <path d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z" fill="currentColor"></path>
                </svg>
                <div>Play</div>
              </a>
              <a className="btn more-info-btn" href="/">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" data-icon="CircleIStandard" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor"></path>
                </svg>
                <div>More Info</div>
              </a>
            </div>
          </div>
        )}
        <div className="featured-media__video-controls">
          <button className="btn mute-btn" onClick={toggleMute}>{isMuted ? 'Unmute' : 'Mute'}</button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMedia;
