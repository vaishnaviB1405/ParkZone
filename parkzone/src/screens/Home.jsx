import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchBox from "../components/SearchBox";
import BackgroundImage from "../Assets/background.png.jpg";

function Home() {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/search-results?location=${encodeURIComponent(query)}`);
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-white text-center vh-100"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}
    >
      <Navbar />
      <div className="mt-5 p-4 bg-dark bg-opacity-75 rounded shadow">
        <h1 className="display-3 fw-bold">Welcome to Your Parking Partner</h1>
        <p className="lead fs-4">Your Parking Journey Starts Here</p>
        <SearchBox onSearch={handleSearch} />
      </div>

      
      </div>
    
  );
}

export default Home;
