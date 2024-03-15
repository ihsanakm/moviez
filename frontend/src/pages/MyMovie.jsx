import React, { useState, useEffect } from "react";
import MovieCard from "../components/movieCard/MovieCard";
import "./myMovie.scss";
import axios from "axios";
import Modal from "../components/modal/Modal";
import AddMovieCard from "../components/movieCard/AddMovieCard";
import UpdateForm from "../components/forms/updateForm";
import AddForm from "../components/forms/addForm";

const MyMovie = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [selectedSingleMovie, setSelectedSingleMovie] = useState(null); // Changed setselectedSingleMovie to setSelectedSingleMovie
  const [isUpdateForm, setIsUpdateForm] = useState(false);
  const [isAddForm, setIsAddForm] = useState(false);

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:3000/my-movie", { withCredentials: true });
      setAllMovies(response.data.movies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const selectedMovie = async (id) => {
    try {
      const selectedMovie = await axios.get(
        `http://localhost:3000/my-movie/read/${id}`,
        { withCredentials: true }
      );
      setSelectedSingleMovie(selectedMovie.data.movie); // Changed setselectedSingleMovie to setSelectedSingleMovie
      setIsUpdateForm(true);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/my-movie/delete/${id}`, { withCredentials: true });
      fetchMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const handleUpdateMovieData = async (updatedMovie) => {
    await fetchMovies();
    setAllMovies(allMovies.map(movie => movie.id === updatedMovie.id ? updatedMovie : movie));
  };

  const handleAddMovieData = async() =>{
    await fetchMovies();
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <div className="movie-grid">
        <button style={{ borderRadius: "30px", height: "350px" }} onClick={() => setIsAddForm(true)}>
          <AddMovieCard />
        </button>
        {allMovies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            handleDelete={handleDelete}
            selectedMovie={selectedMovie}
          />
        ))}
      </div>
      <div>
        {isUpdateForm && (
          <UpdateForm
            selectedSingleMovie={selectedSingleMovie}
            setIsUpdateForm={setIsUpdateForm}
            updateMovieData={handleUpdateMovieData} 
          />
        )}
      </div>
      <div>
        {isAddForm && (
          <AddForm
            setIsAddForm={setIsAddForm}
            addMovieData={handleAddMovieData} 

          />
        )}
      </div>

    </>
  );
};

export default MyMovie;
