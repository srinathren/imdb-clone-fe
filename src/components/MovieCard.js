import React from "react";
import "../styles/MovieCard.css";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card-wrapper">
      <div className="movie-card">
        <img src={movie.poster} alt={movie.name} className="movie-poster" />
        <div className="movie-bio">
          <h2>{movie.name}</h2>
          <p>{movie.year_of_release}</p>
          <p><em>Bio: {movie.plot}</em></p>
          <p><em>Producer: {movie.producer.name}</em></p>
          <p><em>Actors: {movie.actors.map((actor) => actor.name).join(", ")}</em></p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
