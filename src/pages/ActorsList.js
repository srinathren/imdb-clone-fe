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
     
      {loading ? (
        <p style={{color:'white'}}>Loading...</p>
      ) : actors.length > 0 ? (
        <>
        <h1
        style={{
          fontSize: "2.5rem",
          color: 'white',
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "2px",
          margin: 0,
          display: "flex",
          alignItems: "center", 
          marginBottom:'2rem'
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
            height: '1.3rem'
          }}
        >

        </span>
        <span color="white">
          Actor List
        </span>
      </h1>
        <ul style={{height:'max-content', borderRadius:'2rem',paddingTop:'2rem', paddingBottom:'2rem',background:'gray'}}>
          {actors.map((actor) => (
            <li key={actor._id} style={{color:'whitesmoke'}}>
              <strong>{actor.name}</strong> ({actor.bio})
            </li>
          ))}
        </ul>
        </>
      ) : (
        <p>No actors available.</p>
      )}
    </div>
  );
};

export default ActorsList;
