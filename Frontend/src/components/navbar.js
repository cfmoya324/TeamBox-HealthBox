import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav>
      <Link to="/">Login</Link> |{" "}
      <Link to="/dashboard">Dashboard</Link> |{" "}
      <Link to="/paneladmin">Panel de Administrador</Link> |{" "}
      <Link to="/paneltrabajador">Panel de Trabajador</Link>
    </nav>
  );
}

export default Navbar;
