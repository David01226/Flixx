import { React, useState, useEffect } from 'react';
import { fetchAPIData } from '../utils/apiService'
import FeaturedMedia from "../components/FeaturedMedia/FeaturedMedia";
import MediaSlider from "../components/MediaSlider/MediaSlider";

const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState([]);

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
    getPopularMovies();
  }, []);


  return (
    <>
      <FeaturedMedia results={popularMovies}/>
      <MediaSlider endpoint={'movie/popular'} params={'&language=en-US&with_origin_country=US&with_original_language=en&sort_by=popularity.desc'} title='Popular Films'/>
      <MediaSlider endpoint={'discover/movie'} params={'&with_genres=35&sort_by=popularity.desc&vote_count.gte=100&language=en-US&page=1'} title='Comedy Films'/>
      <MediaSlider endpoint={'discover/tv'} params={'&with_genres=18&sort_by=popularity.desc&language=en-US&with_original_language=en&page=2'} title='Critically-acclaimed TV Programmes'/>
      <MediaSlider endpoint={'discover/movie'} params={'&with_genres=878&sort_by=popularity.desc&vote_count.gte=100&language=en-US&page=4'} title='Sci-fi Films'/>
      <MediaSlider endpoint={'discover/movie'} params={'&with_genres=99&sort_by=popularity.desc&vote_count.gte=100&language=en-US&page=3'} title='Documentaries'/>
      <MediaSlider endpoint={'discover/movie'} params={'&with_genres=53&sort_by=popularity.desc&vote_count.gte=100&language=en-US&page=3'} title='Thriller Films'/>
      <MediaSlider endpoint={'discover/tv'} params={'&with_genres=10764&sort_by=popularity.desc&language=en-US&with_original_language=en&page=2'} title='Reality TV'/>
      <MediaSlider endpoint={'discover/tv'} params={'&with_genres=80&sort_by=popularity.desc&language=en-US&with_original_language=en&page=2'} title='Crime TV'/>
      <MediaSlider endpoint={'discover/movie'} params={'&with_genres=18&sort_by=popularity.desc&vote_count.gte=100&language=en-US&page=2'} title='Drama Films'/>
      <MediaSlider endpoint={'discover/movie'} params={'&with_genres=10752&sort_by=popularity.desc&vote_count.gte=100&language=en-US&page=2'} title='War Films'/>
      <MediaSlider endpoint={'discover/movie'} params={'&with_genres=10749&sort_by=popularity.desc&vote_count.gte=100&language=en-US&page=2'} title='Romance Films'/>
    </>
  )
}

export default HomePage