import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const userEmail = sessionStorage.getItem("email") || "User";

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="d-flex vh-100">
      <aside className="bg-dark text-white p-3" style={{ width: "250px" }}>
        <h2 className="mb-4">Admin</h2>
        <ul className="nav flex-column">
          <li className="nav-item p-2" onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li className="nav-item p-2" onClick={() => navigate("/locationList")}>Parking</li>
          <li className="nav-item p-2" onClick={() => navigate("/reservationList")}>Reservations</li>
          <li className="nav-item p-2" onClick={() => navigate("/users")}>Users</li>
          <li className="nav-item p-2" onClick={() => navigate("/addEmployee")}>Add Employee</li>
          <li className="nav-item p-2" onClick={() => navigate("/addLocation")}>Add Parking</li>
          <li className="nav-item p-2 text-danger" onClick={handleLogout}>Log out</li>
        </ul>
      </aside>
      <main className="flex-grow-1 bg-light p-4">
        <header className="d-flex justify-content-between align-items-center mb-4">
          <h1>Dashboard</h1>
          <div>
            <span className="me-3">{userEmail}</span>
            <button className="btn btn-link text-primary text-decoration-none" onClick={handleLogout}>Log out</button>
          </div>
        </header>
        <section className="row g-4">
          {[
            { title: "Parking", text: "10 Slots Available", color: "primary", path: "/locationList" },
            { title: "Reservations", text: "20 Active", color: "success", path: "/reservationList" },
            { title: "Users", text: "50 Total", color: "warning", path: "/users" },
            { title: "Super Admin", text: "1 Active", color: "danger", path: "#" },
            { title: "Add Employee", text: "Manage Employee Records", color: "secondary", path: "/addEmployee" },
            { title: "Add Parking", text: "Allocate New Parking Slots", color: "info", path: "/addLocation" }
          ].map((card, index) => (
            <div key={index} className="col-md-4">
              <div className={`card bg-${card.color} text-white text-center p-3 shadow-lg`} onClick={() => navigate(card.path)} style={{ cursor: "pointer" }}>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <a href="#" className="text-white fw-bold text-decoration-none">More info</a>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
