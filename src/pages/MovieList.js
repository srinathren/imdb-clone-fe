import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, deleteMovieAsync } from "../redux/slices/movieSlice.js"; 
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa"; 
import "../styles/MovieList.css"; 

const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.list);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      dispatch(deleteMovieAsync(id));
    }
  };

  return (
    <div className="movie-list-container">
      <h1>Movies</h1>
      <Link to="/add-movie">
        <button className="add-movie-btn">Add Movie</button>
      </Link>

      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie._id} className="movie-card-wrapper">
              <MovieCard movie={movie} />
              <div className="icon-wrapper">
                <Link to={`/edit-movie/${movie._id}`} className="edit-icon">
                  <FaEdit size={20} title="Edit Movie" />
                </Link>
                <button className="delete-icon" onClick={() => handleDelete(movie._id)}>
                  <FaTrash size={20} title="Delete Movie" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No movies available</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;
