import React from 'react'
import './MediaSlider.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Autoplay} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

const MediaSlider = ({ results, title }) => {
  return (
    <div className="media-slider">
      <div className="media-slider__wrapper container">
      <h3>{title}</h3>
      <Swiper
          modules={[Navigation, Pagination, Scrollbar, Autoplay]}
          slidesPerView={2.5}
          spaceBetween={15}
          freeMode={true}
          loop={true}
          breakpoints={{
            767: { slidesPerView: 5.5 },
            1025: { slidesPerView: 7.5 },
          }}
        >
          {results.map((movie, i) => (
            <SwiperSlide key={movie.id}>
              <div className="media-slider__media-poster">
                <a href={`movie?id=${movie.id}`}>
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