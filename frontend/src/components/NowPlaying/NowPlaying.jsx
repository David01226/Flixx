import React from 'react'
import './NowPlaying.css'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Autoplay} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

const NowPlaying = ({ results }) => {
  return (
    <section className="now-playing">
      <h2>Now Playing</h2>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, Autoplay]}
          slidesPerView={2}
          spaceBetween={30}
          freeMode={true}
          loop={true}
          autoplay={{
            delay: 4000,  
            disableOnInteraction: false,
          }}
          breakpoints={{
            767: { slidesPerView: 3 },
            1025: { slidesPerView: 4 },
          }}
        >
          {results.map((movie, i) => (
            <SwiperSlide key={movie.id}>
              <div>
                <a href={`movie?id=${movie.id}`}>
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                </a>
                <h4 className="swiper-rating">
                  <i className="fas fa-star text-secondary"></i> {movie.vote_average} / 10
                </h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
    </section>
  )
}

export default NowPlaying