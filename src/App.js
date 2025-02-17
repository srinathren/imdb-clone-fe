import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import MovieList from "./pages/MovieList";
import AddMovie from "./pages/AddMovie";
import EditMovie from "./pages/EditMovie";
import ActorsList from "./pages/ActorsList";
import ProducersList from "./pages/ProducersList";

const App = () => {
  return (
    // <div>
      
    <Router>
    <Navbar />
    <div style={{display:'flex', justifyContent:'center', alignContent:'center',background: "linear-gradient(135deg, #1a1a1a, #333333)", // Dark gradient background
}}>
    <div style={{width:'80%'}}>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/add-movie" element={<AddMovie />} />
        <Route path="/edit-movie/:id" element={<EditMovie />} />
        <Route path="/actors" element={<ActorsList />} />
        <Route path="/producers" element={<ProducersList />} />
        
      </Routes>
      </div>
      </div>
    </Router>
    // </div>
  );
};

export default App;
