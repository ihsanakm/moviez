import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import './heros.scss'


import { Navigation } from "swiper/modules";
import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import SlideItem from "./SlideItem";

export default function HeroS() {
  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 2 };
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {
          params,
        });
        setMovieItems(response.results.slice(1, 10));
        console.log(response);
      } catch {
        console.log("error");
      }
    };
    getMovies();
  }, []);

  return (
    <>
      <Swiper navigation={true} modules={[Navigation]}>
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
                            {({ isActive }) => (
                                <SlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                            )}
          </SwiperSlide>
        ))}{" "}
      </Swiper>
    </>
  );
}
