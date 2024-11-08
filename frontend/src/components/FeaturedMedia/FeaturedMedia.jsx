import React, { useEffect, useState } from 'react';
import './FeaturedMedia.css';
import { fetchAPIData } from '../../utils/apiService';

const FeaturedMedia = ({ results }) => {
  const [movie, setMovie] = useState(null);
  const [movieId, setMovieId] = useState(null);
  const [youtubeURL, setYoutubeURL] = useState(null);

  // Set movieId when results change
  useEffect(() => {
    if (results && results.length > 0) {
      // console.log("Movie ID:", results[0].id);
      setMovie(results[0]);
      setMovieId(results[0].id);
    }
  }, [results]);

  // Fetch video data when movieId is set
  useEffect(() => {
    const fetchVideoData = async () => {
      if (!movieId) return;

      try {
        const videoData = await fetchAPIData(`movie/${movieId}/videos`);
        const videos = videoData.results;

        // Find the first trailer and set youtubeURL
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

  return (
    <div className="featured-media">
      <div className="featured-media__media-wrap">
        {youtubeURL && (
          <iframe
            width="100%"
            height="100%"
            src={`${youtubeURL}?rel=0&autoplay=1&mute=1&controls=0&modestbranding=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
      {/* {movie && <div>{movie.title}</div>} */}
    </div>
  );
};

export default FeaturedMedia;
