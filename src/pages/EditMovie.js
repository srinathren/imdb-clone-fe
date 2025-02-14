import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../config";
import "../styles/AddMovie.css";

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    name: "",
    year_of_release: "",
    plot: "",
    poster: "",
    producer: "",
    actors: [],
  });

  const [producers, setProducers] = useState([]);
  const [actorsList, setActorsList] = useState([]);

  // Memoized fetch functions
  const fetchMovieDetails = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/movies/${id}`);
      if (!response.ok) throw new Error("Failed to fetch movie details");
      const data = await response.json();
      setMovie({
        ...data.data,
        producer: data.data.producer?._id || "",
        actors: data.data.actors?.map((actor) => actor._id) || [],
      });
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  }, [id]);

  const fetchProducers = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/producers`);
      if (!response.ok) throw new Error("Failed to fetch producers");
      const data = await response.json();
      setProducers(data.data);
    } catch (error) {
      console.error("Error fetching producers:", error);
    }
  }, []);

  const fetchActors = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/actors`);
      if (!response.ok) throw new Error("Failed to fetch actors");
      const data = await response.json();
      setActorsList(data.data);
    } catch (error) {
      console.error("Error fetching actors:", error);
    }
  }, []);

  useEffect(() => {
    fetchMovieDetails();
    fetchProducers();
    fetchActors();
  }, [fetchMovieDetails, fetchProducers, fetchActors]); // ✅ Now included in dependency array

  const handleChange = (e) => {
    setMovie((prevMovie) => ({
      ...prevMovie,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProducerChange = (e) => {
    setMovie((prevMovie) => ({
      ...prevMovie,
      producer: e.target.value,
    }));
  };

  const handleActorCheckboxChange = (actorId) => {
    setMovie((prevMovie) => {
      const updatedActors = prevMovie.actors.includes(actorId)
        ? prevMovie.actors.filter((id) => id !== actorId)
        : [...prevMovie.actors, actorId];

      return { ...prevMovie, actors: updatedActors };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/movies/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movie),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      navigate("/");
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  return (
    <div className="add-movie-container">
      <h1>Edit Movie</h1>
      <form className="add-movie-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Movie Name:</label>
          <input type="text" name="name" value={movie.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Year of Release:</label>
          <input type="number" name="year_of_release" value={movie.year_of_release} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Plot:</label>
          <textarea name="plot" value={movie.plot} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Poster URL:</label>
          <input type="text" name="poster" value={movie.poster} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Producer:</label>
          <select name="producer" value={movie.producer} onChange={handleProducerChange} required>
            <option value="">Select a producer</option>
            {producers.map((producer) => (
              <option key={producer._id} value={producer._id}>
                {producer.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Actors:</label>
          <div className="actor-checkbox-group">
            {actorsList.map((actor) => (
              <label key={actor._id} className="actor-checkbox">
                <input
                  type="checkbox"
                  value={actor._id}
                  checked={movie.actors.includes(actor._id)}
                  onChange={() => handleActorCheckboxChange(actor._id)}
                />
                {actor.name}
              </label>
            ))}
          </div>
        </div>

        <button type="submit">Update Movie</button>
      </form>
    </div>
  );
};

export default EditMovie;
