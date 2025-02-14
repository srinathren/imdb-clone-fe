import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMovieAsync } from "../redux/slices/movieSlice";
import { useNavigate } from "react-router-dom";
import AddActorForm from "../components/AddActorForm";
import AddProducerForm from "../components/AddProducerForm";
import "../styles/AddMovie.css";
import BASE_URL from "../config.js";

const AddMovie = () => {
  const [movie, setMovie] = useState({
    name: "",
    year_of_release: "",
    plot: "",
    poster: "",
    producer: "",
    actors: [],
  });

  const [producers, setProducers] = useState([]);
  const [actors, setActors] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showAddActorForm, setShowAddActorForm] = useState(false);
  const [showAddProducerForm, setShowAddProducerForm] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const producerRes = await fetch(`${BASE_URL}/producers`);
      const actorRes = await fetch(`${BASE_URL}/actors`);

      const producerData = await producerRes.json();
      const actorData = await actorRes.json();

      setProducers(producerData.data || []);
      setActors(actorData.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedMovie = { ...movie, actors: selectedActors };
    dispatch(addMovieAsync(updatedMovie));
    navigate("/");
  };

  return (
    <div className="add-movie-container">
      <h1>Add Movie</h1>

      <form onSubmit={handleSubmit} className="add-movie-form">
        <div className="form-group">
          <label>Movie Name</label>
          <input type="text" name="name" placeholder="Movie Name" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Year of Release</label>
          <input type="number" name="year_of_release" placeholder="Year" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Plot</label>
          <textarea name="plot" placeholder="Short description" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Poster URL</label>
          <input type="text" name="poster" placeholder="Poster URL" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Producer</label>
          <select name="producer" onChange={(e) => setMovie({ ...movie, producer: e.target.value })} required>
            <option value="">Select Producer</option>
            {producers.map((producer) => (
              <option key={producer._id} value={producer._id}>{producer.name}</option>
            ))}
          </select>
          <button type="button" onClick={() => setShowAddProducerForm(true)}>+ Add Producer</button>
        </div>

        <div className="form-group">
          <label>Select Actors:</label>
          <div className="custom-dropdown">
            <div className="dropdown-header" onClick={() => setDropdownOpen(!dropdownOpen)}>
              {selectedActors.length > 0 ? selectedActors.map((id) => actors.find((actor) => actor._id === id)?.name).join(", ") : "Select Actors"}
            </div>
            {dropdownOpen && (
              <div className="dropdown-content">
                {actors.map((actor) => (
                  <label key={actor._id}>
                    <input type="checkbox" value={actor._id} checked={selectedActors.includes(actor._id)}
                      onChange={(e) => setSelectedActors(e.target.checked ? [...selectedActors, e.target.value] : selectedActors.filter(id => id !== e.target.value))} />
                    {actor.name}
                  </label>
                ))}
                <button type="button" onClick={() => setShowAddActorForm(true)}>+ Add Actor</button>
              </div>
            )}
          </div>
        </div>

        <button type="submit">Save</button>
      </form>

      {showAddActorForm && <AddActorForm onClose={() => setShowAddActorForm(false)} onActorAdded={fetchData} />}
      {showAddProducerForm && <AddProducerForm onClose={() => setShowAddProducerForm(false)} onProducerAdded={fetchData} />}
    </div>
  );
};

export default AddMovie;
