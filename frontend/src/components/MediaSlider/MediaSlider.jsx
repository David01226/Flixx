import React, { useEffect, useState } from 'react'
import './MediaSlider.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Autoplay} from 'swiper/modules';
import { fetchCustomAPIData } from '../../utils/apiService';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

const MediaSlider = ({ title, endpoint, params }) => {
  const [results, setResults] = useState([]);

  // Fetch popular movie data
  async function getSliderData(endpoint, params) {
    try {
      const { results } = await fetchCustomAPIData(endpoint, params);
      setResults(results);
    } catch (error) {
      console.error("Error fetching popular movie data:", error);
    }
  }

  useEffect(() => {
    getSliderData(endpoint, params);
  }, []);

  let mediaType;
  if (endpoint.includes('movie')) {
    mediaType = 'movie';
  } else {
    mediaType = 'show';
  }

  return (
    <div className="media-slider">
      <div className="media-slider__wrapper container">
      <h3>{title}</h3>
      <Swiper
          modules={[Navigation, Pagination, Scrollbar, Autoplay]}
          slidesPerView={2.5}
          spaceBetween={15}
          freeMode={true}
          loop={false}
          navigation={true}
          pagination={true}
          breakpoints={{
            767: { slidesPerView: 5.5 },
            1025: { slidesPerView: 7 },
          }}
        >
          {results.map((movie, i) => (
            <SwiperSlide key={movie.id}>
              <div className="media-slider__media-poster">
                <a href={`${mediaType}?id=${movie.id}`}>
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default MediaSlider