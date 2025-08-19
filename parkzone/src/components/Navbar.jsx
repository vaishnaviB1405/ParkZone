import React, { useState } from "react";
import ProfileImage from "../Assets/Profile.png.png"; 
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark fixed-top shadow px-3 d-flex justify-content-between align-items-center">
      <h2 className="text-white mb-0 ms-3">PARKZONE</h2>
      <div className="position-relative me-3">
        <div className="d-flex align-items-center" onClick={toggleDropdown} style={{ cursor: "pointer" }}>
          <img
            src={ProfileImage}
            alt="Profile"
            className="rounded-circle"
            width="40"
            height="40"
          />
        </div>
        {isDropdownVisible && (
          <div className="position-absolute bg-white text-dark rounded shadow mt-2 end-0" style={{ width: "200px", zIndex: 10 }}>
            <ul className="list-unstyled mb-0">
              <li className="p-2 border-bottom text-start" onClick={() => navigate("/home")}>Edit Profile</li>
              <li className="p-2 border-bottom text-start" onClick={() => navigate("/myReservationList")}>Reservations</li>
              <li className="p-2 text-start text-danger" onClick={handleLogout}>Logout</li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

