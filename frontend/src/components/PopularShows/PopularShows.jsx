import React from 'react'
import './PopularShows.css'
import MediaSlider from "../MediaSlider/MediaSlider";

const PopularShows = () => {
  return (
    <>
      <MediaSlider endpoint={'discover/tv'} params={'&with_genres=18&sort_by=popularity.desc&language=en-US&with_original_language=en&page=2'} title='Critically-acclaimed TV Programmes'/>
      <MediaSlider endpoint={'discover/tv'} params={'&with_genres=10764&sort_by=popularity.desc&language=en-US&with_original_language=en&page=2'} title='Reality TV Programmes'/>
      <MediaSlider endpoint={'discover/tv'} params={'&with_genres=16&sort_by=popularity.desc&language=en-US&with_original_language=en&page=2'} title='Animated TV Programmes'/>
      <MediaSlider endpoint={'discover/tv'} params={'&with_genres=35&sort_by=popularity.desc&language=en-US&with_original_language=en&page=2'} title='Comedy TV Programmes'/>
      <MediaSlider endpoint={'discover/tv'} params={'&with_genres=80&sort_by=popularity.desc&language=en-US&with_original_language=en&page=2'} title='Crime TV Programmes'/>
      <MediaSlider endpoint={'discover/tv'} params={'&with_genres=99&sort_by=popularity.desc&language=en-US&with_original_language=en&page=2'} title='Documentaries'/>
      <MediaSlider endpoint={'discover/tv'} params={'&with_genres=10751&sort_by=popularity.desc&language=en-US&with_original_language=en&page=1'} title='Family TV Programmes'/>
    </>
  )
}

export default PopularShows