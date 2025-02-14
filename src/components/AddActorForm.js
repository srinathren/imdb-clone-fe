import React, { useState } from "react";
import "../styles/AddForm.css"; 
import BASE_URL from "../config.js";

const AddActorForm = ({ onClose, onActorAdded }) => {
  const [actor, setActor] = useState({
    name: "",
    gender: "",
    dob: "",
    bio: "",
  });

  const handleChange = (e) => {
    setActor({ ...actor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/actors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...actor, movies: [] }),
      });

      if (response.ok) {
        alert("Actor added successfully!");
        onActorAdded();
        onClose();
      }
    } catch (error) {
      console.error("Error adding actor:", error);
    }
  };

  return (
    <div className="popup-form">
      <h2>Add Actor</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="date" name="dob" onChange={handleChange} required />
        <textarea name="bio" placeholder="Bio" onChange={handleChange} required></textarea>
        <button type="submit">Add Actor</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default AddActorForm;
