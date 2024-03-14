import { useNavigate } from "react-router-dom";
import apiConfig from "../../api/apiConfig";
import Button, { OutlineButton } from "../button/Button";

import "./heros.scss";
import axios from "axios";
import tmdbApi from "../../api/tmdbApi";

const SlideItem = (props) => {
  const navigate = useNavigate();

  const item = props.item;

  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  const addToMyMovies = async () => {
    try {
      const Movie = await tmdbApi.detail(item.id, { params: {} });
      console.log("movie",Movie)
      const response = await axios.post("http://localhost:3000/movie/add", {
        id: item.id,  
      title: Movie.title || Movie.name,
        overview: Movie.overview,
        backdropPath: Movie.backdrop_path,
        posterPath: Movie.poster_path,
        genres: Movie.genres.map(genre => genre.name),      
      });

      console.log("Added to watchlist:", response.data);
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };


  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div
        className="hero-slide__item__content container"
        style={{ height: "100vh" }}
      >
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="btns">
            <Button onClick={() => navigate("/movie/" + item.id)}>
              Watch now
            </Button>
            <OutlineButton onClick={addToMyMovies}>Add to My Movies</OutlineButton>
          </div>
          <div className="hero-slide__item__content__poster">
            <div>{item.overview}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideItem;
