import React, { useEffect, useState } from 'react'
import MovieInfo from "../components/MovieInfo/MovieInfo"
import { fetchAPIData } from '../utils/apiService'


const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [youtubeURL, setYoutubeURL] = useState(null);
  const [videoTitle, setVideoTitle] = useState('');

  useEffect(() => {
    displayMovieDetails();
  }, []);

  async function displayMovieDetails() {
    try {
      console.log('Display Movie Details');
      const movieId = new URLSearchParams(window.location.search).get('id');

      // Fetch movie details
      const fetchedMovie = await fetchAPIData(`movie/${movieId}`);
      setMovie(fetchedMovie);

      // Display background image if needed
      // displayBackgroundImage('movie', fetchedMovie.backdrop_path);

      // Fetch video data
      const videoData = await fetchAPIData(`movie/${movieId}/videos`);
      const videos = videoData.results;
      
      // Initialize the YouTube link
      let youtubeLink = "https://www.youtube.com/embed/";
      // Find a trailer first; if not found, use the first video
      const trailer = videos.find(video => video.type === 'Trailer');
      if (trailer) {
        youtubeLink += trailer.key;
        setVideoTitle(trailer.type)
      } else if (videos.length > 0) {
        youtubeLink += videos[0].key;
        setVideoTitle(videos[0].type)
      } else {
        youtubeLink = null; // No videos available
      }

      // Set the YouTube URL if a video link was found
      if (youtubeLink) {
        setYoutubeURL(youtubeLink);
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  }

  return (
    <MovieInfo movie={movie} youtubeURL={youtubeURL} videoTitle={videoTitle}/>
  )
}

export default MovieDetails