import React from 'react'
import './PopularMovies.css'
import MediaSlider from "../MediaSlider/MediaSlider";

const PopularMovies = () => {
  return (
    <>
      <MediaSlider endpoint={'discover/movie'} params={'&with_genres=35&sort_by=popularity.desc&vote_count.gte=100&language=en-US&page=1'} title='Comedy Films'/>
      <MediaSlider endpoint={'discover/movie'} params={'&with_genres=878&sort_by=popularity.desc&vote_count.gte=100&language=en-US&page=4'} title='Sci-fi Films'/>
      <MediaSlider endpoint={'discover/movie'} params={'&with_genres=99&sort_by=popularity.desc&vote_count.gte=100&language=en-US&page=3'} title='Documentaries'/>
      <MediaSlider endpoint={'discover/movie'} params={'&with_genres=53&sort_by=popularity.desc&vote_count.gte=100&language=en-US&page=3'} title='Thriller Films'/>
      <MediaSlider endpoint={'discover/movie'} params={'&with_genres=18&sort_by=popularity.desc&vote_count.gte=100&language=en-US&page=2'} title='Drama Films'/>
      <MediaSlider endpoint={'discover/movie'} params={'&with_genres=10752&sort_by=popularity.desc&vote_count.gte=100&language=en-US&page=2'} title='War Films'/>
      <MediaSlider endpoint={'discover/movie'} params={'&with_genres=10749&sort_by=popularity.desc&vote_count.gte=100&language=en-US&page=2'} title='Romance Films'/>
    </>
  )
}

export default PopularMovies