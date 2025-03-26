import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbarr";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Auditor from "./pages/Auditor";
import Supervisor from "./pages/Supervisor";
import Trabajador from "./pages/Trabajador";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
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
