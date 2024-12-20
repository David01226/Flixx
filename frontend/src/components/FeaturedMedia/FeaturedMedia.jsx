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
      setMovie(results[5]);
      setMovieId(results[5].id);
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
          setYoutubeURL(`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&modestbranding=1&enablejsapi=1&cc_load_policy=0`);
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchVideoData();
  }, [movieId]);

  useEffect(() => {
    const timer = setTimeout(() => setShowBackdrop(false), 5000);
    return () => clearTimeout(timer);
    
  }, [youtubeURL]);

  useEffect(() => {
    const checkVideoTime = () => {
      const player = iframeRef.current?.contentWindow;
      // console.log(player)
      if (player) {
        player.postMessage('{"event":"listening"}', '*');
        const interval = setInterval(() => {
          player.postMessage('{"event":"getCurrentTime"}', '*');
        }, 1000);
        window.addEventListener('message', (event) => {
          if (event.origin !== 'https://www.youtube.com') return;
          const data = JSON.parse(event.data);
          if (data.event === 'infoDelivery' && data.info.progressState) {
            if (data.event === 'infoDelivery' && data.info.currentTime >= data.info.progressState.duration - 6) {
              setShowBackdrop(true);
              clearInterval(interval);
            }
          }
        });

        return () => clearInterval(interval);
      }
    };

    if (iframeRef.current) {
      iframeRef.current.onload = checkVideoTime;
    }
  }, [youtubeURL, showBackdrop]);

  const toggleMute = () => {
    const player = iframeRef.current?.contentWindow;
    if (player) {
      player.postMessage(`{"event":"command","func":"${isMuted ? 'unMute' : 'mute'}","args":""}`, '*');
      // console.log('mute/unmute')
    }
    setIsMuted(prevState => !prevState);
  };

  return (
    <div className="featured-media">
      <div className="featured-media__media-wrap">
        {youtubeURL && !showBackdrop && (
          <iframe
            ref={iframeRef}
            width="100%"
            height="100%"
            src={youtubeURL}
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
        {!showBackdrop && (
          <div className="featured-media__video-controls">
            <button className="btn mute-btn" onClick={toggleMute}>{isMuted ? 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" data-icon="VolumeOffStandard" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M11 4.00003C11 3.59557 10.7564 3.23093 10.3827 3.07615C10.009 2.92137 9.57889 3.00692 9.29289 3.29292L4.58579 8.00003H1C0.447715 8.00003 0 8.44774 0 9.00003V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00003ZM5.70711 9.70714L9 6.41424V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70714ZM15.2929 9.70714L17.5858 12L15.2929 14.2929L16.7071 15.7071L19 13.4142L21.2929 15.7071L22.7071 14.2929L20.4142 12L22.7071 9.70714L21.2929 8.29292L19 10.5858L16.7071 8.29292L15.2929 9.70714Z" fill="currentColor"></path></svg>
              : 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" data-icon="VolumeHighStandard" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M24 12C24 8.28693 22.525 4.72597 19.8995 2.10046L18.4853 3.51468C20.7357 5.76511 22 8.81736 22 12C22 15.1826 20.7357 18.2348 18.4853 20.4852L19.8995 21.8995C22.525 19.2739 24 15.713 24 12ZM11 3.99995C11 3.59549 10.7564 3.23085 10.3827 3.07607C10.009 2.92129 9.57889 3.00685 9.29289 3.29285L4.58579 7.99995H1C0.447715 7.99995 0 8.44767 0 8.99995V15C0 15.5522 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0786 10.3827 20.9238C10.7564 20.7691 11 20.4044 11 20V3.99995ZM5.70711 9.70706L9 6.41417V17.5857L5.70711 14.2928L5.41421 14H5H2V9.99995H5H5.41421L5.70711 9.70706ZM16.0001 12C16.0001 10.4087 15.368 8.88254 14.2428 7.75732L12.8285 9.17154C13.5787 9.92168 14.0001 10.9391 14.0001 12C14.0001 13.0608 13.5787 14.0782 12.8285 14.8284L14.2428 16.2426C15.368 15.1174 16.0001 13.5913 16.0001 12ZM17.0709 4.92889C18.9462 6.80426 19.9998 9.3478 19.9998 12C19.9998 14.6521 18.9462 17.1957 17.0709 19.071L15.6567 17.6568C17.157 16.1565 17.9998 14.1217 17.9998 12C17.9998 9.87823 17.157 7.8434 15.6567 6.34311L17.0709 4.92889Z" fill="currentColor"></path></svg>
              }</button>
          </div>
        )}
      </div>
      {movie && (
        <div className="featured-media__meta">
          <h2>{movie.title}</h2>
          <div className="featured-media__description">{movie.overview}</div>
          <div className="featured-media__ctas">
            {/* <a className="btn play-btn" href="/">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" data-icon="PlayStandard" aria-hidden="true">
                <path d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z" fill="currentColor"></path>
              </svg>
              <div>Play</div>
            </a> */}
            <a className="btn more-info-btn" href={`movie?id=${movie.id}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" data-icon="CircleIStandard" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor"></path>
              </svg>
              <div>More Info</div>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedMedia;
