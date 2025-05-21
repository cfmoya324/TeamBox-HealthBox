import React, { useState } from "react";
//import axios from "axios";
import Sidepanel from "../components/sidepanel";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import "../styles/Trabajador.css";

function Trabajador({isSidePanelOpen}) {
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

  const handleUpload = async () => {
    if (file) {
      const newFile = {
        id: Date.now(),
        name: file.name,
        url: URL.createObjectURL(file),
      };

      try {
        //await axios.post(
        //  "http://localhost:5000/api/reports", newFile,
        //  {
        //    headers: {
        //      Authorization: `Bearer ${localStorage.getItem("token")}`,
        //    },
        //  }
        //);

        setUploadedFiles([...uploadedFiles, newFile]);
        setFile(null);

        setMessage("");

      } catch (error) {
        console.error("❌ Error al guardar el reporte:", error);
        alert("❌ Error al guardar el reporte.");
      }
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este archivo?")) {
      setUploadedFiles(uploadedFiles.filter((f) => f.id !== id));
    }
  };

  const dropHandler = (event) => {
    event.preventDefault();

    const files = event.dataTransfer.files;
    const body = {target: {files: files}}

    const fileInputToDropTo = document.getElementById('fileInputToDropTo');
    fileInputToDropTo.files = files;

    handleFileChange(body);
  };

  const dragoverHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Sidepanel isSidePanelOpen={isSidePanelOpen}/>
      <div className="trabajador-container">
        <h2>Panel de Trabajador</h2>

        <p>Sube tus informes en archivos de PDF o XLSX:</p>

        <div onDrop={dropHandler} onDragOver={dragoverHandler} className={file !== null ? "uploadZone uploadZoneFull hideOnMobile":"uploadZone uploadZoneEmpty hideOnMobile"}>
          {file !== null ? <span><IoCheckmarkDoneSharp /></span>:'Suelta tu archivo aquí...'} 
        </div>

        <span>
          <input
            type="file"
            accept=".pdf,.xlsx"
            onChange={handleFileChange}
            id="fileInputToDropTo"
          />
          {message && <p className="error-message">{message}</p>}
          <button
            className="subida-btn"
            onClick={handleUpload}
            disabled={!file}
          >
            Subir Archivo
          </button>
        </span>

        <h3>Informes Subidos: {uploadedFiles.length}</h3>
      </div>

      <div className="informe-section">
        <ul>
          {uploadedFiles.map((f) => (
            <li key={f.id}>
              <span className="informe-nombre">{f.name}</span>
              <div className="informe-botones">
                <a className="descargar-btn" href={f.url} download={f.name}>
                  Descargar
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
