import React from "react";
import "../styles/MovieCard.css";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card-wrapper">
      <div className="movie-card">
        <img src={movie.poster} alt={movie.name} className="movie-poster" />
        <div className="movie-bio">
          <h3>{movie.name}</h3>
          <p>Year: {movie.year_of_release}</p>
          <p>Producer: {movie.producer.name}</p>
          <p>Actors: {movie.actors.map((actor) => actor.name).join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
