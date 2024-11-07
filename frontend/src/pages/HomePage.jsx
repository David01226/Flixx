import { React, useState, useEffect } from 'react';
import NowPlaying from "../components/NowPlaying/NowPlaying"
import PopularMovies from "../components/PopularMovies/PopularMovies"
import Search from "../components/Search/Search"
import { fetchAPIData } from '../utils/apiService'

const HomePage = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  // Fetch now playing data
  async function getNowPlaying() {
    try {
      const { results } = await fetchAPIData('movie/now_playing');
      setNowPlaying(results);
    } catch (error) {
      console.error("Error fetching now playing data:", error);
    }
  }

  // Fetch popular movie data
  async function getPopularMovies() {
    try {
      const { results } = await fetchAPIData('movie/popular');
      setPopularMovies(results);
    } catch (error) {
      console.error("Error fetching popular movie data:", error);
    }
  }

  // Call functions on component mount
  useEffect(() => {
    getNowPlaying();
    getPopularMovies();
  }, []);


  return (
    <>
      <NowPlaying results={nowPlaying}/>
      <Search />
      <PopularMovies results={popularMovies}/>
    </>
  )
}

export default HomePage