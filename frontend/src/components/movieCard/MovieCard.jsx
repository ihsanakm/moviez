import React from "react";

import "./movieCard.scss";

import { Link } from "react-router-dom";

import Button from "../button/Button";

import tmdbApi, { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import SpeedDialButton from "../speedDialButton/SpeedDialButton";

const MovieCard = ({handleDelete,item,movie,selectedMovie}) => {

  const bg = apiConfig.w500Image(
    item
      ? item.poster_path || item.backdrop_path
      : movie.posterPath || movie.backdropPath
  );

  const addToMyMovies = async () => {
    try {
      const Movie = await tmdbApi.detail(item ? item.id : movie.id, {
        params: {},
      });
      const response = await axios.post("http://localhost:3000/movie/add", {
        id: Movie.id,
        title: Movie.title || Movie.name,
        overview: Movie.overview,
        backdropPath: Movie.backdrop_path,
        posterPath: Movie.poster_path,
        genres: Movie.genres.map((genre) => genre.name),
      },{ withCredentials: true });

      console.log("Added to watchlist:", response.data);
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  return (
    <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
      <h3 className="cardtitle">
        {item ? item.title || item.name : movie.title || movie.name}
      </h3>
      <div className="cardBtns">
        <Link to={`/${category}/${item ? item.id : movie.id}`}>
          <Button>
            <FontAwesomeIcon icon={faPlay} />
          </Button>
        </Link>

        {movie ? (
          <SpeedDialButton id={movie.id} handleDelete={handleDelete} selectedMovie={selectedMovie}
          />
        ) : (
          <Link>
            <Button onClick={addToMyMovies}>
              <FontAwesomeIcon icon={faHeart} />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
