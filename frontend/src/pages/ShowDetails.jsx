import React, { useEffect, useState } from 'react'
import ShowInfo from "../components/ShowInfo/ShowInfo"
import { fetchAPIData } from '../utils/apiService'


const ShowDetails = () => {
  const [show, setShow] = useState(null);

  useEffect(() => {
    displayShowDetails();
  }, []);

  async function displayShowDetails() {
    try {
      const showId = new URLSearchParams(window.location.search).get('id');

      // Fetch movie details
      const fetchedShow = await fetchAPIData(`tv/${showId}`);
      setShow(fetchedShow);
    } catch (error) {
      console.error('Error fetching show details:', error);
    }
  }

  return (
    <ShowInfo show={show}/>
  )
}

export default ShowDetails