import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Auditor from "./pages/Auditor";
import Supervisor from "./pages/Supervisor";
import Trabajador from "./pages/Trabajador";
import Dashboard from "./pages/Dashboard";

// Import de los estilos;
import "./styles/navbar.css";
import "./styles/Admin.css";
import "./styles/Auditor.css";
import "./styles/Supervisor.css";
import "./styles/Trabajador.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/auditor" element={<Auditor />} />
        <Route path="/supervisor" element={<Supervisor />} />
        <Route path="/trabajador" element={<Trabajador />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
