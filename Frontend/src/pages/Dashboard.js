import React from "react";
import { useNavigate } from "react-router-dom";
import Sidepanel from "../components/sidepanel";
import "../styles/Dashboard.css"; 

function Dashboard({isSidePanelOpen}) {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div>
      <Sidepanel isSidePanelOpen={isSidePanelOpen}/>
      <div className="dashboard-container">
        <h2>Bienvenido, tu rol es: {role}</h2>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  );
}

export default Dashboard;
