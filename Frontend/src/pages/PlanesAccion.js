import React, { useState } from "react";
import "../styles/PlanesAccion.css";

const PlanesAccion = () => {
  const [form, setForm] = useState({
    nombre: "",
    responsable: "",
    area: "",
    descripcion: "",
    estado: "pendiente",
    fechaCompromiso: "",
  });

  const [acciones, setAcciones] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaAccion = {
      ...form,
      fecha: new Date().toLocaleString(),
    };

    setAcciones([...acciones, nuevaAccion]);

    setForm({
      nombre: "",
      responsable: "",
      area: "",
      descripcion: "",
      estado: "pendiente",
      fechaCompromiso: "",
    });
  };

  const handleEstadoChange = (index, nuevoEstado) => {
    const nuevasAcciones = [...acciones];
    nuevasAcciones[index].estado = nuevoEstado;
    setAcciones(nuevasAcciones);
  };

  return (
    <div className="planes-container">
      <h1 className="titulo">Planes de Acción y Mejora Continua</h1>

      <form onSubmit={handleSubmit} className="formulario">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre de la acción"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="responsable"
          placeholder="Responsable"
          value={form.responsable}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="area"
          placeholder="Área"
          value={form.area}
          onChange={handleChange}
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          maxLength={500}
          required
        />
        <label>Fecha de compromiso (opcional)</label>
        <input
          type="date"
          name="fechaCompromiso"
          value={form.fechaCompromiso}
          onChange={handleChange}
        />
        <select
          name="estado"
          value={form.estado}
          onChange={handleChange}
        >
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En Progreso</option>
          <option value="completado">Completado</option>
        </select>
        <button type="submit">Registrar Acción</button>
      </form>

      <div className="historial">
        <h2>Historial de Acciones</h2>
        {acciones.length === 0 ? (
          <p>No hay acciones registradas.</p>
        ) : (
          <ul className="acciones-lista">
            {acciones.map((a, index) => (
              <li key={index} className="accion-item">
                <p><strong>Nombre:</strong> {a.nombre}</p>
                <p><strong>Responsable:</strong> {a.responsable}</p>
                <p><strong>Área:</strong> {a.area}</p>
                <p><strong>Descripción:</strong> {a.descripcion}</p>
                {a.fechaCompromiso && (
                  <p><strong>Fecha de compromiso:</strong> {a.fechaCompromiso}</p>
                )}
                <p><strong>Fecha de registro:</strong> {a.fecha}</p>
                <label><strong>Estado:</strong></label>
                <select
                  value={a.estado}
                  onChange={(e) => handleEstadoChange(index, e.target.value)}
                  className="select-estado"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en progreso">En Progreso</option>
                  <option value="completado">Completado</option>
                </select>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PlanesAccion;
