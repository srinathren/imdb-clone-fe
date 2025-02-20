import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const RecentMovies = ({ scrollToMovie }) => {
  const movies = useSelector((state) => state.movies.list);
  const currentYear = new Date().getFullYear();

  const recentMovies = movies.filter((movie) => parseInt(movie.year_of_release, 10) === currentYear);

  const carouselRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div
      className="recent-movies-container"
      style={{ marginTop: "20px", position: "relative", transition: "opacity 0.5s ease-in-out" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
          <span color="white" >Recent Movies</span>
          
        </h1>

      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        style={{
          position: "absolute",
          top: "50%",
          left: "0",
          transform: "translateY(-50%)",
          background: "rgba(0, 0, 0, 0.6)",
          border: "none",
          cursor: "pointer",
          color: "#ffcc00",
          padding: "10px",
          borderRadius: "50%",
          zIndex: 10,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <FaChevronLeft size={24} />
      </button>

      <div
        ref={carouselRef}
        className="recent-movie-carousel"
        style={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          whiteSpace: "nowrap",
          gap: "20px",
          padding: "10px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          marginTop: "40px"
        }}
      >
        {recentMovies.length > 0 ? (
          recentMovies.map((movie) => (
            <div
              key={movie._id}
              className="movie-card-wrapper"
              style={{ flex: "0 0 auto", width: "200px", cursor: "pointer" }}
              onClick={() => scrollToMovie(movie._id)}
            >
              <div className="movie-card">
                <img
                  src={movie.poster}
                  alt={movie.name}
                  className="movie-poster"
                  style={{ width: "100%", borderRadius: "10px" }}
                />
                <div className="movie-bio">
                  <h3 style={{ textAlign: "center", color: "#fff" }}>{movie.name}</h3>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: "#ccc", textAlign: "center" }}>No recent movies found.</p>
        )}
      </div>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        style={{
          position: "absolute",
          top: "50%",
          right: "0",
          transform: "translateY(-50%)",
          background: "rgba(0, 0, 0, 0.6)",
          border: "none",
          cursor: "pointer",
          color: "#ffcc00",
          padding: "10px",
          borderRadius: "50%",
          zIndex: 10,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <FaChevronRight size={24} />
      </button>
    </div>
  );
};

export default RecentMovies;
