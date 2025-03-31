import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css"; 

function Dashboard() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <h2>Bienvenido, tu rol es: {role}</h2>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}

export default Dashboard;
