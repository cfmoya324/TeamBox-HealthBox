import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css";

function Admin() {
  const navigate = useNavigate();

  const handleGestionUsuarios = () => {
    navigate("/paneladmin");
  };

  return (
    <div className="admin-container">
      <h2>Panel de Administrador</h2>
      <p>Aquí puedes gestionar usuarios y permisos.</p>
      {/* Botón para futuras acciones*/}
      <button className="action-button" onClick={handleGestionUsuarios}>Gestionar Usuarios</button>
    </div>
  );
}

export default Admin;
