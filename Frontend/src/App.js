import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import GestionRiesgos from "./pages/GestionRiesgos";
import PlanesAccion from "./pages/PlanesAccion";
import NotFound from "./pages/notFound";

function App() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") !== null);

  const getRole = (role) => {
    return localStorage.getItem('role') === role || localStorage.getItem('role') === 'administrador';
  }

  return (
    <Router>
      <Navbar 
        isSidePanelOpen={isSidePanelOpen} 
        setIsSidePanelOpen={setIsSidePanelOpen} 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn} 
      />

      <Routes>
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <Login />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/administrador" element={<Admin />} />
        <Route path="/auditor" element={<Auditor />} />
        <Route path="/supervisor" element={<Supervisor />} />
        <Route path="/trabajador" element={<Trabajador />} />
        <Route 
          path="/dashboard" 
          element={isLoggedIn ? <Dashboard isSidePanelOpen={isSidePanelOpen} /> : <Navigate replace={true} to="/login" />} 
        />
        <Route 
          path="/paneladmin" 
          element={isLoggedIn && getRole('administrador') ? <AdminUsuarios isSidePanelOpen={isSidePanelOpen} /> : <Navigate replace={true} to="/" />} 
        />
        <Route 
          path="/paneltrabajador" 
          element={isLoggedIn && getRole('trabajador') ? <Trabajador isSidePanelOpen={isSidePanelOpen} /> : <Navigate replace={true} to="/" />} 
        />
        <Route 
          path="/autoevaluacion" 
          element={isLoggedIn && getRole('auditor') ? <SelfAssessment isSidePanelOpen={isSidePanelOpen} /> : <Navigate replace={true} to="/" />} 
        />
        <Route 
          path="/preguntas" 
          element={isLoggedIn && getRole('administrador') ? <AdminPreguntas isSidePanelOpen={isSidePanelOpen} /> : <Navigate replace={true} to="/" />} 
        />
        <Route 
          path="/gestion-riesgos" 
          element={isLoggedIn && getRole('supervisor') ? <GestionRiesgos isSidePanelOpen={isSidePanelOpen} /> : <Navigate replace={true} to="/" />} 
        />
        <Route 
          path="/planes-accion" 
          element={isLoggedIn && getRole('supervisor') ? <PlanesAccion isSidePanelOpen={isSidePanelOpen} /> : <Navigate replace={true} to="/" />} 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
