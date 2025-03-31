import React from "react";
import "../styles/Admin.css";

function Admin() {
  return (
    <div className="admin-container">
      <h2>Panel de Administrador</h2>
      <p>Aquí puedes gestionar usuarios y permisos.</p>
      {/* Botón para futuras acciones*/}
      <button className="action-button">Gestionar Usuarios</button>
    </div>
  );
}

export default Admin;
