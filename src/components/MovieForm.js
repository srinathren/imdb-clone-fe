import React, { useState } from "react";

const MovieForm = ({ onSubmit }) => {
  const [movie, setMovie] = useState({ name: "", year: "", producer: "", actors: [] });

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={(e) => onSubmit(e, movie)}>
      <input type="text" name="name" placeholder="Movie Name" onChange={handleChange} required />
      <input type="number" name="year" placeholder="Year" onChange={handleChange} required />
      <button type="submit">Save</button>
    </form>
  );
};

export default MovieForm;
