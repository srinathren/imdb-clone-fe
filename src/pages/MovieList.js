import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, deleteMovieAsync } from "../redux/slices/movieSlice.js";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../styles/MovieList.css";

const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.list);
  const [hoveredMovieId, setHoveredMovieId] = useState(null);


  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);


 
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      dispatch(deleteMovieAsync(id));
    }
  };

  return (
    <div
      className="movie-list-container"
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        background: "linear-gradient(135deg, #1a1a1a, #333333)", // Dark gradient background
        backgroundAttachment: "fixed", // Keeps the background fixed while scrolling
        borderRadius: "10px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)", // Deep shadow for depth
        color: "#fff", // White text for contrast
        backdropFilter: "blur(5px)", // Slight blur to add depth
        position: "relative",
        overflow: "hidden",
        zIndex: "1",
      }}
    >
      {/* Title and Button Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            color: 'white',
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "2px",
            margin: 0,
            display: "flex",
            alignItems: "center", // Aligns the gold tag and text vertically
          }}
        >
          <span
            style={{
              backgroundColor: "#ffcc00", // Gold color for the tag
              color: "#222", // Dark color for the tag text
              fontWeight: "600", // Slightly bold for emphasis
              padding: "5px 10px",
              borderRadius: "5px",
              marginRight: "15px", // Space between the tag and the text
              fontSize: "1rem", // Smaller font size for the tag
              textTransform: "uppercase", // Make tag text uppercase
              height: '1.3rem'
            }}
          >

          </span>
          <span color="white">
            Movies
          </span>
        </h1>

        <Link to="/add-movie">
          <button
            className="add-movie-btn"
            style={{
              backgroundColor: "gold", // Green background for button
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
            onMouseOver={(e) => (e.target.style.backgroundColor = "goldenrod")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "gold")}
          >
            Add Movie
          </button>
        </Link>
      </div>

      {/* Movie Grid */}
      <div
        className="movie-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie._id}
              className={`movie-card-wrapper ${hoveredMovieId === movie._id ? "hovered" : ""
                }`}
              onMouseEnter={() => setHoveredMovieId(movie._id)}
              onMouseLeave={() => setHoveredMovieId(null)}
              style={{
                position: "relative",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgb(255, 204, 0)", // Uniform yellow shadow for each card
                overflow: "hidden",
                backgroundColor: "#222222", // Dark background for each card
                padding: "15px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
              }}
            >
              <MovieCard
                movie={movie}
                showBio={hoveredMovieId === movie._id}
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
                  backgroundColor: "rgba(0, 0, 0, 0.6)", // Darker background for icons
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
        ) : (
          <p style={{ fontSize: "1.2rem", color: "#ccc", display:'flex', justifyContent:'center', alignContent:'center' }}><span>LOADING ...</span></p>
        )}
      </div>
    </div>
  );
};

export default MovieList;
