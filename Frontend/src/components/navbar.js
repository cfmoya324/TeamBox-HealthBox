import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav>
      <Link to="/">Login</Link> | <Link to="/dashboard">Dashboard</Link>
    </nav>
  );
}

export default Navbar;
