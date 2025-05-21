import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidepanel from "../components/sidepanel";
import "../styles/PlanesAccion.css";

const PlanesAccion = ({isSidePanelOpen}) => {
  const [form, setForm] = useState({
    nombre: "",
    responsable: "",
    area: "",
    descripcion: "",
    estado: "pendiente",
    fechaCompromiso: "",
  });

  const [acciones, setAcciones] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  const fetchAcciones = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/planes");
      setAcciones(res.data);
    } catch (err) {
      console.error("❌ Error al obtener planes:", err);
      alert('Sesión finalizada, por favor inicie sesión de nuevo.') // muy probablemente sea que el token expiró
    }
  };

  useEffect(() => {
    fetchAcciones();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editandoId) {
        await axios.put(`http://localhost:5000/api/planes/${editandoId}`, form);
        setEditandoId(null);
      } else {
        await axios.post("http://localhost:5000/api/planes", form);
      }

      setForm({
        nombre: "",
        responsable: "",
        area: "",
        descripcion: "",
        estado: "pendiente",
        fechaCompromiso: "",
      });

      fetchAcciones();
    } catch (err) {
      console.error("❌ Error al guardar acción:", err);
    }
  };

  const handleEdit = (accion) => {
    setForm(accion);
    setEditandoId(accion._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar esta acción?")) {
      await axios.delete(`http://localhost:5000/api/planes/${id}`);
      fetchAcciones();
    }
  };

  const handleEstadoChange = async (id, nuevoEstado) => {
    try {
      await axios.put(`http://localhost:5000/api/planes/${id}`, { estado: nuevoEstado });
      fetchAcciones();
    } catch (err) {
      console.error("❌ Error al actualizar estado", err);
    }
  };

  return (
    <div>
      <Sidepanel isSidePanelOpen={isSidePanelOpen}/>
      <div className="planes-container">
        <h1 className="titulo">Planes de Acción y Mejora Continua</h1>

        <form onSubmit={handleSubmit} className="formulario">
          <input type="text" name="nombre" placeholder="Nombre de la acción" value={form.nombre} onChange={handleChange} required />
          <input type="text" name="responsable" placeholder="Responsable" value={form.responsable} onChange={handleChange} required />
          <input type="text" name="area" placeholder="Área" value={form.area} onChange={handleChange} required />
          <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} maxLength={500} required />
          <label>Fecha de compromiso</label>
          <input type="date" name="fechaCompromiso" value={form.fechaCompromiso} onChange={handleChange} />
          <select name="estado" value={form.estado} onChange={handleChange}>
            <option value="pendiente">Pendiente</option>
            <option value="en progreso">En Progreso</option>
            <option value="completado">Completado</option>
          </select>
          <button type="submit">{editandoId ? "Actualizar" : "Registrar"} Acción</button>
        </form>

        <div className="historial">
          <h2>Historial de Acciones</h2>
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
                <p><strong>Estado:</strong></p>
                <select value={a.estado} onChange={(e) => handleEstadoChange(a._id, e.target.value)}>
                  <option value="pendiente">Pendiente</option>
                  <option value="en progreso">En Progreso</option>
                  <option value="completado">Completado</option>
                </select>
                <div className="acciones">
                  <button onClick={() => handleEdit(a)}>Editar</button>
                  <button onClick={() => handleDelete(a._id)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlanesAccion;


