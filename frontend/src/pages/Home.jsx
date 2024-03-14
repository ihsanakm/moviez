import React from "react";

import HeroSlide from "../components/heroSlide/HeroSlide"
import MovieGrid from "../components/movieGrid/MovieGrid";
import { category } from "../api/tmdbApi";

const Home = () => {
  return (
    <>
    <HeroSlide />
      <div className="container">
        <div className="section mb-3">
          <MovieGrid category={category} />
        </div>
      </div>
    </>
  );
};

export default Home;
