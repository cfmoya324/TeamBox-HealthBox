import React from "react";
import { Link } from "react-router-dom";

function navbar() {
  return (
    <nav>
      <Link to="/">Login</Link> | <Link to="/dashboard">Dashboard</Link>
    </nav>
  );
}

export default navbar;
