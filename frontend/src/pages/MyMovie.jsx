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
  const [selectedSingleMovie, setselectedSingleMovie] = useState("");
  const [isUpdateForm, setIsUpdateForm] = useState(false);
  const [isAddForm, setIsAddForm] = useState(false);


  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:3000/my-movie");
      setAllMovies(response.data.movies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const selectedMovie = async (id) => {
    try {
      const selectedMovie = await axios.get(
        `http://localhost:3000/my-movie/read/${id}`
      );
      setselectedSingleMovie(selectedMovie.data.movie);
      setIsUpdateForm(true);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/my-movie/delete/${id}`);
      fetchMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const handleModalClose = (modal) => {
    setSelectedMovie("");
    setIsModalOpen(modal);
  };

  const handleUpdate = async (id, updatedMovie) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/my-movie/update/${id}`,
        updatedMovie
      );
      console.log("Update response:", response.data);
      // If the update is successful, close the modal and fetch the updated movie list
      handleModalClose();
      fetchMovies();
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <div className="movie-grid">
        <button style={{ borderRadius: "30px", height: "350px" }} onClick={()=>setIsAddForm(true)}>
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
          />
        )}
      </div>
      <div>
        {isAddForm && (
          <AddForm
          setIsAddForm={setIsAddForm}
          />
        )}
      </div>

    </>
  );
};

export default MyMovie;
