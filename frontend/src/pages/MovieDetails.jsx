import React, { useEffect, useState } from 'react'
import MovieInfo from "../components/MovieInfo/MovieInfo"
import { fetchAPIData } from '../utils/apiService'


const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [youtubeURL, setYoutubeURL] = useState(null);

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
      
      let youtubeLink = "https://www.youtube.com/embed/";
      for (let i = 0; i < videos.length; i++) {
        if (videos[i].type === 'Trailer') {
          youtubeLink += videos[i].key;
          break; // Exit the loop after finding the first trailer
        }
      }
      setYoutubeURL(youtubeLink);

    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  }

  return (
    <MovieInfo movie={movie} youtubeURL={youtubeURL}/>
  )
}

export default MovieDetails