import React from "react";
import { Link } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import "../styles/sidepanel.css";

function Sidepanel({isSidePanelOpen}) {
    return (
        <aside className={isSidePanelOpen ? '':'hideSidepanel'}>
            <div>
                {
                    window.location.pathname !== '/' ?
                    <Link className="sidepanelBackButton" to="/">
                        <IoChevronBack/>
                        <span> Regresar </span>
                    </Link>
                    :
                    <div></div>
                }
                <Link to="/login">Login</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/paneladmin">Panel de gestión de usuarios del Administrador</Link>
                <Link to="/preguntas">Panel de edición de preguntas del Administrador</Link>
                <Link to="/autoevaluacion">Panel de autoevaluación del Auditor</Link>
                <Link to="/paneltrabajador">Panel de Trabajador</Link>
                <Link to="/supervisor">Supervisor</Link>
                <Link to="/gestion-riesgos">Gestion de Riesgos</Link>
                <Link to="/planes-accion">Planes de Acción</Link>
            </div>
        </aside>
    );
}

export default Sidepanel;
