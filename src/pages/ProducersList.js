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
      <h1>Producers</h1>
      {loading ? (
        <p>Loading...</p>
      ) : producers.length > 0 ? (
        <ul>
          {producers.map((producer) => (
            <li key={producer._id}>
              <strong>{producer.name}</strong> ({producer.bio})
            </li>
          ))}
        </ul>
      ) : (
        <p>No producers available.</p>
      )}
    </div>
  );
};

export default ProducersList;
