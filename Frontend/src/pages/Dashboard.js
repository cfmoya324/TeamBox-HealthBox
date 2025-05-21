import React from "react";
import Sidepanel from "../components/sidepanel";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css"; 

function Dashboard({isSidePanelOpen}) {
  const role = localStorage.getItem("role");

  return (
    <div>
      <Sidepanel isSidePanelOpen={isSidePanelOpen}/>
      <div className="dashboard-container">
        <h1>Bienvenido, tu rol es: {role}</h1>
        {role === 'administrador' ? 
        <>
          <Link to="/login">Login</Link><br/>
          <Link to="/dashboard">Dashboard</Link><br/>
          <Link to="/paneladmin">Panel de gestión de usuarios del Administrador</Link><br/>
          <Link to="/preguntas">Panel de edición de preguntas del Administrador</Link><br/>
          <Link to="/autoevaluacion">Panel de autoevaluación del Auditor</Link><br/>
          <Link to="/paneltrabajador">Panel de Trabajador</Link><br/>
          <Link to="/gestion-riesgos">Gestion de Riesgos</Link><br/>
          <Link to="/planes-accion">Planes de Acción</Link><br/>
        </>
        : 
        role === 'trabajador' ? 
        <>
          <Link to="/login">Login</Link><br/>
          <Link to="/dashboard">Dashboard</Link><br/>
          <Link to="/paneltrabajador">Panel de Trabajador</Link><br/>
        </>
        :
        role === 'auditor' ? 
        <>
          <Link to="/login">Login</Link><br/>
          <Link to="/dashboard">Dashboard</Link><br/>
          <Link to="/autoevaluacion">Panel de autoevaluación del Auditor</Link><br/>
        </>:
        role === 'supervisor' ? 
        <>
          <Link to="/login">Login</Link><br/>
          <Link to="/dashboard">Dashboard</Link><br/>
          <Link to="/gestion-riesgos">Gestion de Riesgos</Link><br/>
          <Link to="/planes-accion">Planes de Acción</Link><br/>
        </>
        :
        <></>
        }
      </div>
    </div>
  );
}

export default Dashboard;
