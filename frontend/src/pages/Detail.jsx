import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import "./detail.scss";

import tmdbApi from "../api/tmdbApi";
import apiConfig from "../api/apiConfig";
import Button, { OutlineButton } from "../components/button/Button";
import axios from "axios";

const Detail = () => {
  const { id } = useParams();

  const [item, setItem] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(id, { params: {} });
      console.log("res",response)
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [id]);

  const addToWatchlist = async () => {
    try {
      const response = await axios.post("http://localhost:3000/movie/add", {
        id: item.id,
        title: item.title || item.name,
        overview: item.overview,
        backdropPath: item.backdrop_path,
        posterPath: item.poster_path,
        genres: item.genres.map(genre => genre.name),      
      });

      console.log("Added to watchlist:", response.data);
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.poster_path || item.backdrop_path
                  )})`,
                }}
              ></div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">{item.title || item.name}</h1>
              <div className="genres">
                {item.genres &&
                  item.genres.slice(0, 5).map((genre, i) => (
                    <span key={i} className="genres__item">
                      {genre.name}
                    </span>
                  ))}
              </div>
              <p className="overview">{item.overview}</p>
              <div className="cast">
                <div className="section__header">
                  <div className="btns">
                    <Button>Watch now</Button>
                    <OutlineButton onClick={addToWatchlist} >Add to Watchlist</OutlineButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
