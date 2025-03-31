import React, { useState } from "react";
import "../styles/Trabajador.css"; 

function Trabajador() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Validar que el archivo sea PNG o PDF
    if (selectedFile && (selectedFile.type === "image/png" || selectedFile.type === "application/pdf")) {
      setFile(selectedFile);
      setMessage("");
    } else {
      setFile(null);
      setMessage("Solo se permiten archivos PNG o PDF.");
    }
  };

  const handleUpload = () => {
    if (file) {
      alert(`Archivo ${file.name} subido con éxito.`);
    } else {
      alert("No se ha seleccionado un archivo válido.");
    }
  };

  return (
    <div className="trabajador-container">
      <h2>Panel de Trabajador</h2>
      <p>Sube tus fotos en PNG o documentos en PDF.</p>

      <input type="file" accept="image/png,application/pdf" onChange={handleFileChange} />
      {message && <p className="error-message">{message}</p>}

      <button onClick={handleUpload} disabled={!file}>Subir Archivo</button>
    </div>
  );
}

export default Trabajador;
