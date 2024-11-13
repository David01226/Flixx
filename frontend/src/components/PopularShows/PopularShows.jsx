import React from 'react'
import './PopularShows.css'
import MediaSlider from "../MediaSlider/MediaSlider";

const PopularShows = ({ results }) => {
  return (
    <div id="popular-shows">
      <MediaSlider endpoint={'movie/popular'} params={'&language=en-US&with_origin_country=US&with_original_language=en&sort_by=popularity.desc'} title='Popular Films'/>
    </div>
  )
}

export default PopularShows