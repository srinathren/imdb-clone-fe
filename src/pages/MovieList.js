import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, deleteMovieAsync } from "../redux/slices/movieSlice.js";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../styles/MovieList.css";
import RecentMovies from "../components/RecentMovies.js";

const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.list);
  const [hoveredMovieId, setHoveredMovieId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 
  const movieRefs = useRef({}); 
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      dispatch(deleteMovieAsync(id));
    }
  };


  const scrollToMovie = (movieId) => {
    if (movieRefs.current[movieId]) {
      movieRefs.current[movieId].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="movie-list-container"
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        background: "linear-gradient(135deg, #1a1a1a, #333333)",
        backgroundAttachment: "fixed",
        borderRadius: "10px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        color: "#fff",
        backdropFilter: "blur(5px)",
        position: "relative",
        overflow: "hidden",
        zIndex: "1",
      }}
    >
      <div style={{ marginBottom: "40px", marginTop: "40px" }}>
          <RecentMovies scrollToMovie={scrollToMovie} />
      </div>
      
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            color: "white",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "2px",
            margin: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              backgroundColor: "#ffcc00",
              color: "#222",
              fontWeight: "600",
              padding: "5px 10px",
              borderRadius: "5px",
              marginRight: "15px",
              fontSize: "1rem",
              textTransform: "uppercase",
              height: "1.3rem",
            }}
          ></span>
          <span color="white">Movies</span>
        </h1>

        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px 15px",
            borderRadius: "5px",
            border: "none",
            fontSize: "1rem",
            width: "200px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "#fff",
            outline: "none",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        />

        <Link to="/add-movie">
          <button
            className="add-movie-btn"
            style={{
              backgroundColor: "gold",
              color: "black",
              padding: "12px 30px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              fontSize: "1.2rem",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              transition: "background-color 0.3s ease",
              textTransform: "uppercase",
              fontWeight: "600",
            }}
          >
            Add Movie
          </button>
        </Link>
      </div>

      <div
        className="movie-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div
              key={movie._id}
              ref={(el) => (movieRefs.current[movie._id] = el)}
              className={`movie-card-wrapper ${
                hoveredMovieId === movie._id ? "hovered" : ""
              }`}
              onMouseEnter={() => setHoveredMovieId(movie._id)}
              onMouseLeave={() => setHoveredMovieId(null)}
              style={{
                position: "relative",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgb(255, 204, 0)",
                overflow: "hidden",
                backgroundColor: "#222222",
                padding: "15px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
              }}
            >
              <MovieCard
                movie={movie}
                showBio={hoveredMovieId === movie._id}
                scrollToMovie={scrollToMovie}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  transition: "transform 0.3s ease",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  borderRadius: "5px",
                  padding: "5px",
                  display: hoveredMovieId === movie._id ? "flex" : "none",
                  gap: "10px",
                  zIndex: "10",
                  alignItems: "center",
                  paddingLeft: "0.7rem",
                }}
              >
                <div>
                  <Link
                    to={`/edit-movie/${movie._id}`}
                    style={{ display: "block", cursor: "pointer" }}
                  >
                    <FaEdit size={20} title="Edit Movie" style={{ color: "#ffcc00" }} />
                  </Link>
                </div>
                <div>
                  <button
                    onClick={() => handleDelete(movie._id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <FaTrash size={20} title="Delete Movie" style={{ color: "#dc3545" }} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : searchTerm ? (
          <p style={{ fontSize: "1.2rem", color: "#ccc", textAlign: "center" }}>
            No movies found matching "{searchTerm}"
          </p>
        ) : (
          <p
            style={{
              fontSize: "1.2rem",
              color: "#ccc",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <span>LOADING ...</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieList;
