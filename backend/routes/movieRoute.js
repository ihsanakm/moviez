const Movie = require("../model/movie");


//Creating using API
const createMovie = async (req, res) => {
  const {id,title,overview,backdropPath,posterPath,genres} = req.body;

  try {
    const existingMovie = await Movie.findOne({ id: id });

    if (existingMovie) {
      return res
        .status(400)
        .json({ error: "Movie with the same id already exists." });
    }

    const movie = await Movie.create({
      id: id,
      title: title,
      overview: overview,
      backdropPath: backdropPath,
      posterPath: posterPath,
      genres: genres,
    });

    res.json({ Movie: movie });
  } catch (error) {
    console.error("Error creating movie:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findOne({ id:id, user:req.user._id });

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.json({ movie });
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({user: req.user._id});

    res.json({ movies });
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteMovie = await Movie.findOneAndDelete({id:id, user:req.user._id});
    if (!deleteMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json({ message: "Movie successfully deleted" });
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateMovie = async (req, res) => {
  const { id } = req.params;
  const {title,
    overview,
    genres} =req.body

  try {
    let movie = await Movie.findOneAndUpdate({ id, user:req.user._id },{title:title,overview:overview,genres:genres});

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // movie.title = req.body.title;
    // movie.overview = req.body.overview;
    // // movie.backdropPath = req.body.backdropPath;
    // // movie.posterPath = req.body.posterPath;
    // movie.genres = req.body.genres;

    // movie = await movie.save();

    res.json({ movie });
  } catch (error) {
    console.error('Error updating movie:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//Creating using custom form
const addMovie = async (req, res) => {
  try {
    const { id, title, overview, backdropPath, posterPath, genres, date } = req.body;

    const newMovie = await Movie.create({
      id,
      title,
      overview,
      backdropPath,
      posterPath,
      genres,
      date,
      user:req.user._id
    });

    // Send a success response with the newly created movie document
    res.status(201).json({ success: true, movie: newMovie });
  } catch (error) {
    // Handle errors and send an error response
    console.error('Error adding movie:', error);
    res.status(500).json({ success: false, error: 'Could not add movie.' });
  }
};

module.exports = {
  createMovie: createMovie,
  getMovies: getMovies,
  getMovie:getMovie,
  deleteMovie: deleteMovie,
  updateMovie:updateMovie,
  addMovie:addMovie
};
