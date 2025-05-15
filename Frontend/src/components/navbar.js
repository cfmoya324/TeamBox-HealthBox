import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav>
      <Link to="/login">Login</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/paneladmin">Panel de Administrador</Link>
      <Link to="/autoevaluacion">Panel de Auditor</Link>
      <Link to="/paneltrabajador">Panel de Trabajador</Link>
      <Link to="/supervisor">Supervisor</Link>
    </nav>
  );
}

export default Navbar;
