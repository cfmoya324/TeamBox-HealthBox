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
import AdminUsuarios from "./pages/AdminUsuarios";
import SelfAssessment from "./pages/SelfAssessment";
import AdminPreguntas from "./pages/AdminPreguntas";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/administrador" element={<Admin />} />
        <Route path="/auditor" element={<Auditor />} />
        <Route path="/supervisor" element={<Supervisor />} />
        <Route path="/trabajador" element={<Trabajador />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/paneladmin" element={<AdminUsuarios />} />
        <Route path="/paneltrabajador" element={<Trabajador />} /> {/* Nueva ruta */}
        <Route path="/autoevaluacion" element={<SelfAssessment />} />
        <Route path="/preguntas" element={<AdminPreguntas />} />
      </Routes>
    </Router>
  );
}

export default App;
