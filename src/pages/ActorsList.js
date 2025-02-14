import React, { useEffect, useState } from "react";
import "../styles/ListPage.css"
import BASE_URL from "../config.js";

const ActorsList = () => {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const response = await fetch(`${BASE_URL}/actors`);
        const data = await response.json();
        setActors(data.data || []);
      } catch (error) {
        console.error("Error fetching actors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActors();
  }, []);

  return (
    <div className="list-container">
      <h1>Actors</h1>
      {loading ? (
        <p>Loading...</p>
      ) : actors.length > 0 ? (
        <ul>
          {actors.map((actor) => (
            <li key={actor._id}>
              <strong>{actor.name}</strong> ({actor.bio})
            </li>
          ))}
        </ul>
      ) : (
        <p>No actors available.</p>
      )}
    </div>
  );
};

export default ActorsList;
