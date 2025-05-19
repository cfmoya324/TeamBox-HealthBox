// src/pages/Admin.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css";

function Admin() {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      <h2>Panel de Administrador</h2>
      <p>Aquí puedes gestionar usuarios y permisos.</p>

      <div className="admin-buttons">
        <button className="action-button" onClick={() => navigate("/paneladmin")}>
          Gestionar Usuarios
        </button>
        <button className="action-button" onClick={() => navigate("/preguntas")}>
          Gestionar Normativas y Preguntas
        </button>
      </div>
    </div>
  );
}

export default Admin;

