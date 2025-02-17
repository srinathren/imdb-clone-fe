import React, { useEffect, useState } from "react";
import "../styles/ListPage.css"
import BASE_URL from "../config.js";

const ProducersList = () => {
  const [producers, setProducers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/producers`);
        const data = await response.json();
        setProducers(data.data || []);
      } catch (error) {
        console.error("Error fetching producers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducers();
  }, []);

  return (
    <div className="list-container">
      
      {loading ? (
        <p style={{color:'white'}}>Loading...</p>
      ) : producers.length > 0 ? (
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
          Producers List
        </span>
      </h1>
        <ul style={{height:'max-content', borderRadius:'2rem',paddingTop:'2rem', paddingBottom:'2rem',background:'gray', color:'whitesmoke'}}>
          {producers.map((producer) => (
            
            <li key={producer._id}>
              <strong>{producer.name}</strong> ({producer.bio})
            </li>
          
          ))}
        </ul>
        </>
      ) : (
        <p>No producers available.</p>
      )}
    </div>
  );
};

export default ProducersList;
