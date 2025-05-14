import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auditor.css";

function Auditor() {
  const navigate = useNavigate();

  return (
    <div className="auditor-container">
      <h2>Panel de Auditor</h2>
      <p>Aquí puedes ver los registros y auditorías.</p>

      <button
        className="auditor-button"
        onClick={() => navigate("/autoevaluacion")}
      >
        Ir a Autoevaluaciones
      </button>
    </div>
  );
}

export default Auditor;

