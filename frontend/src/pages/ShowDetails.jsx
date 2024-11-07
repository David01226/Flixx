import React, { useEffect, useState } from 'react'
import ShowInfo from "../components/ShowInfo/ShowInfo"
import { fetchAPIData } from '../utils/apiService'


const ShowDetails = () => {
  const [show, setShow] = useState(null);
  const [youtubeURL, setYoutubeURL] = useState(null);
  const [trailerFound, setTrailerFound] = useState(false)

  useEffect(() => {
    displayShowDetails();
  }, []);

  async function displayShowDetails() {
    try {
      console.log('Display Show Details');
      const showId = new URLSearchParams(window.location.search).get('id');

      // Fetch movie details
      const fetchedShow = await fetchAPIData(`tv/${showId}`);
      setShow(fetchedShow);

      // Fetch video data
      const videoData = await fetchAPIData(`tv/${showId}/videos`);
      const videos = videoData.results;
      console.log(videos)
      
      let youtubeLink = "https://www.youtube.com/embed/";
      let trailerFound = false;
      
      // Look for the first video with type 'Trailer'
      for (let i = 0; i < videos.length; i++) {
        if (videos[i].type === 'Trailer' && videos[i].key) {
          youtubeLink += videos[i].key;
          setTrailerFound(true)
          break; // Exit the loop after finding the first trailer
        }
      }
      
      // If no trailer was found, default to the first available video with a key
      if (!trailerFound && videos.length > 0 && videos[0].key) {
        youtubeLink += videos[0].key;
        setTrailerFound(true)
      }
      
      setYoutubeURL(youtubeLink);

    } catch (error) {
      console.error('Error fetching show details:', error);
    }
  }

  return (
    <ShowInfo show={show} youtubeURL={youtubeURL} trailerFound={trailerFound}/>
  )
}

export default ShowDetails