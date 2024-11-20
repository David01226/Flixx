import React, { useEffect, useState } from 'react'
import ShowInfo from "../components/ShowInfo/ShowInfo"
import { fetchAPIData } from '../utils/apiService'


const ShowDetails = () => {
  const [show, setShow] = useState(null);
  const [youtubeURL, setYoutubeURL] = useState(null);
  const [videoTitle, setVideoTitle] = useState('');

  useEffect(() => {
    displayShowDetails();
  }, []);

  async function displayShowDetails() {
    try {
      const showId = new URLSearchParams(window.location.search).get('id');

      // Fetch TV show details
      const fetchedShow = await fetchAPIData(`tv/${showId}`);
      setShow(fetchedShow);

      // Optional: Display background image if needed
      // displayBackgroundImage('tv', fetchedShow.backdrop_path);

      // Fetch video data for the TV show
      const videoData = await fetchAPIData(`tv/${showId}/videos`);
      const videos = videoData.results;
      // console.log(videos)

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
      console.error('Error fetching show details:', error);
    }
  }

  return (
    <ShowInfo show={show} youtubeURL={youtubeURL} videoTitle={videoTitle}/>
  )
}

export default ShowDetails