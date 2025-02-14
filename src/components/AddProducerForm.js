import React, { useState } from "react";
import "../styles/AddForm.css"
import BASE_URL from "../config.js";

const AddProducerForm = ({ onClose, onProducerAdded }) => {
  const [producer, setProducer] = useState({
    name: "",
    gender: "",
    dob: "",
    bio: "",
  });

  const handleChange = (e) => {
    setProducer({ ...producer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/producers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...producer, movies: [] }),
      });

      if (response.ok) {
        alert("Producer added successfully!");
        onProducerAdded();
        onClose();
      }
    } catch (error) {
      console.error("Error adding producer:", error);
    }
  };

  return (
    <div className="popup-form">
      <h2>Add Producer</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="date" name="dob" onChange={handleChange} required />
        <textarea name="bio" placeholder="Bio" onChange={handleChange} required></textarea>
        <button type="submit">Add Producer</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default AddProducerForm;
