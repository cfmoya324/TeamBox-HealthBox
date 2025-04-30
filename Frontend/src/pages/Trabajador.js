import React, { useState } from "react";
import "../styles/Trabajador.css";

function Trabajador() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (selectedFile && validTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setMessage("");
    } else {
      setFile(null);
      setMessage("Solo se permiten archivos PDF o XLSX.");
    }
  };

  const handleUpload = () => {
    if (file) {
      const newFile = {
        id: Date.now(),
        name: file.name,
        url: URL.createObjectURL(file),
      };
      setUploadedFiles([...uploadedFiles, newFile]);
      setFile(null);
      setMessage("");
      alert(`Archivo ${file.name} subido con éxito.`);
    } else {
      alert("No se ha seleccionado un archivo válido.");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este archivo?")) {
      setUploadedFiles(uploadedFiles.filter((f) => f.id !== id));
    }
  };

  return (
    <div className="trabajador-container">
      <h2>Panel de Trabajador</h2>

      <div className="upload-section">
        <p>Sube tus informes en PDF o XLSX:</p>
        <input
          type="file"
          accept=".pdf,.xlsx"
          onChange={handleFileChange}
        />
        {message && <p className="error-message">{message}</p>}
        <button
          className="subida-btn"
          onClick={handleUpload}
          disabled={!file}
        >
          Subir Archivo
        </button>
      </div>

      <div className="informe-section">
        <h3>Informes Subidos: {uploadedFiles.length}</h3>
        <ul>
          {uploadedFiles.map((f) => (
            <li key={f.id}>
              <span className="informe-nombre">{f.name}</span>
              <div className="informe-botones">
                <a href={f.url} download={f.name}>
                  <button className="descargar-btn">Descargar</button>
                </a>
                <button
                  className="eliminar-btn"
                  onClick={() => handleDelete(f.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Trabajador;
