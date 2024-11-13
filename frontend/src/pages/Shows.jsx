import React, { useEffect, useState } from 'react'
import { fetchAPIData } from '../utils/apiService'
import PopularShows from "../components/PopularShows/PopularShows";

const Shows = () => {
  const [popularShows, setPopularShows] = useState([]);

  // Fetch popular tv show data
  async function getPopularShows() {
    try {
      const { results } = await fetchAPIData('discover/tv');
      setPopularShows(results);
    } catch (error) {
      console.error("Error fetching popular tv show data:", error);
    }
  }

  // Call functions on component mount
  useEffect(() => {
    getPopularShows();
  }, []);

  return (
    <>
      <h2>Popular TV Shows</h2>
      <PopularShows results={popularShows}/>
    </>
  )
}

export default Shows