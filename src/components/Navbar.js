import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>IMDB Clone</h2>
      <ul style={styles.navLinks}>
        <li>
          <Link to="/" style={styles.link}>Movies</Link>
        </li>
        <li>
          <Link to="/add-movie" style={styles.link}>Add Movie</Link>
        </li>
        <li>
          <Link to="/actors" style={styles.link}>Actors</Link>
        </li>
        <li>
          <Link to="/producers" style={styles.link}>Producers</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#333",
    color: "#fff",
  },
  logo: {
    margin: 0,
    fontSize: "1.5rem",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "15px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "bold",
  },
};

export default Navbar;
