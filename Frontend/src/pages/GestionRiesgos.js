import React, { useState } from "react";
import "../styles/GestionRiesgos.css";

const GestionRiesgos = () => {
  const [form, setForm] = useState({
    nombre: "",
    tipo: "",
    nivel: "bajo",
    area: "",
    descripcion: "",
    archivo: null,
  });

  const [riesgos, setRiesgos] = useState([]);
  const [filtroNivel, setFiltroNivel] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "archivo") {
      setForm({ ...form, archivo: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const archivo = form.archivo;
    const archivoUrl = archivo ? URL.createObjectURL(archivo) : null;

    const nuevoRiesgo = {
      ...form,
      fecha: new Date().toLocaleString(),
      archivoUrl,
    };

    setRiesgos([...riesgos, nuevoRiesgo]);

    setForm({
      nombre: "",
      tipo: "",
      nivel: "bajo",
      area: "",
      descripcion: "",
      archivo: null,
    });
  };

  const riesgosFiltrados = filtroNivel
    ? riesgos.filter((r) => r.nivel === filtroNivel)
    : riesgos;

  return (
    <div className="gestion-riesgos-container">
      <h1 className="gestion-titulo">Gestión de Riesgos Laborales</h1>

      <form onSubmit={handleSubmit} className="formulario-riesgos">
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre del Riesgo"
          className="campo-formulario"
          required
        />
        <input
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          placeholder="Tipo de Riesgo"
          className="campo-formulario"
          required
        />
        <select
          name="nivel"
          value={form.nivel}
          onChange={handleChange}
          className="campo-formulario"
          required
        >
          <option value="bajo">Bajo</option>
          <option value="medio">Medio</option>
          <option value="alto">Alto</option>
        </select>
        <input
          name="area"
          value={form.area}
          onChange={handleChange}
          placeholder="Área Afectada"
          className="campo-formulario"
          required
        />
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Descripción detallada del riesgo"
          className="campo-formulario"
          maxLength={500}
          required
        />
        <input
          type="file"
          name="archivo"
          onChange={handleChange}
          className="campo-formulario"
        />
        <button type="submit" className="boton-enviar">
          Registrar Riesgo
        </button>
      </form>

      <div className="historial-container">
        <h2 className="historial-titulo">Historial de Riesgos</h2>

        <div className="filtro-nivel">
          <label>Filtrar por nivel:</label>
          <select
            value={filtroNivel}
            onChange={(e) => setFiltroNivel(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="bajo">Bajo</option>
            <option value="medio">Medio</option>
            <option value="alto">Alto</option>
          </select>
        </div>

        {riesgosFiltrados.length === 0 ? (
          <p>No hay riesgos registrados.</p>
        ) : (
          <ul className="riesgos-lista">
            {riesgosFiltrados.map((r, index) => (
              <li key={index} className="riesgo-item">
                <p><strong>Nombre:</strong> {r.nombre}</p>
                <p><strong>Tipo:</strong> {r.tipo}</p>
                <p><strong>Nivel:</strong> {r.nivel}</p>
                <p><strong>Área:</strong> {r.area}</p>
                <p><strong>Descripción:</strong> {r.descripcion}</p>
                <p><strong>Fecha:</strong> {r.fecha}</p>
                {r.archivo && r.archivoUrl && (
                  <p>
                    <strong>Archivo:</strong>{" "}
                    <a href={r.archivoUrl} download={r.archivo.name}>
                      Descargar {r.archivo.name}
                    </a>
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GestionRiesgos;
