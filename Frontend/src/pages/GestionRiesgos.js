import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidepanel from "../components/sidepanel";
import "../styles/GestionRiesgos.css";

const GestionRiesgos = ({isSidePanelOpen}) => {
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
  const [editandoId, setEditandoId] = useState(null);

  const fetchRiesgos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/riesgos");
      setRiesgos(res.data);
    } catch (err) {
      console.error("❌ Error al cargar riesgos", err);
      alert('Sesión finalizada, por favor inicie sesión de nuevo.') // muy probablemente sea que el token expiró
    }
  };

  useEffect(() => {
    fetchRiesgos();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "archivo") {
      setForm({ ...form, archivo: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nombre", form.nombre);
      formData.append("tipo", form.tipo);
      formData.append("nivel", form.nivel);
      formData.append("area", form.area);
      formData.append("descripcion", form.descripcion);
      if (form.archivo) {
        formData.append("archivo", form.archivo);
      }

      const config = { headers: { "Content-Type": "multipart/form-data" } };

      if (editandoId) {
        await axios.put(`http://localhost:5000/api/riesgos/${editandoId}`, formData, config);
        setEditandoId(null);
      } else {
        await axios.post("http://localhost:5000/api/riesgos", formData, config);
      }

      setForm({
        nombre: "",
        tipo: "",
        nivel: "bajo",
        area: "",
        descripcion: "",
        archivo: null,
      });

      fetchRiesgos();
    } catch (err) {
      console.error("❌ Error al guardar", err);
      alert("❌ Error al guardar riesgo");
    }
  };

  const handleEdit = (riesgo) => {
    setForm({
      nombre: riesgo.nombre,
      tipo: riesgo.tipo,
      nivel: riesgo.nivel,
      area: riesgo.area,
      descripcion: riesgo.descripcion,
      archivo: null, // No se puede precargar el archivo
    });
    setEditandoId(riesgo._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar este riesgo?")) {
      try {
        await axios.delete(`http://localhost:5000/api/riesgos/${id}`);
        fetchRiesgos();
      } catch (err) {
        console.error("❌ Error al eliminar riesgo", err);
      }
    }
  };

  const riesgosFiltrados = filtroNivel ? riesgos.filter(r => r.nivel === filtroNivel) : riesgos;

  return (
    <div>
      <Sidepanel isSidePanelOpen={isSidePanelOpen}/>
      <div className="gestion-riesgos-container">
        <h1 className="gestion-titulo">Gestión de Riesgos Laborales</h1>

        <form onSubmit={handleSubmit} className="formulario-riesgos" encType="multipart/form-data">
          <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre del Riesgo" required />
          <input name="tipo" value={form.tipo} onChange={handleChange} placeholder="Tipo de Riesgo" required />
          <select name="nivel" value={form.nivel} onChange={handleChange} required>
            <option value="bajo">Bajo</option>
            <option value="medio">Medio</option>
            <option value="alto">Alto</option>
          </select>
          <input name="area" value={form.area} onChange={handleChange} placeholder="Área Afectada" required />
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción detallada" maxLength={500} required />
          <input type="file" name="archivo" onChange={handleChange} />
          <button type="submit">{editandoId ? "Actualizar" : "Registrar"} Riesgo</button>
        </form>

        <div className="historial-container">
          <h2>Historial de Riesgos</h2>
          <div className="filtro-nivel">
            <label>Filtrar por nivel:</label>
            <select value={filtroNivel} onChange={(e) => setFiltroNivel(e.target.value)}>
              <option value="">Todos</option>
              <option value="bajo">Bajo</option>
              <option value="medio">Medio</option>
              <option value="alto">Alto</option>
            </select>
          </div>

          <ul className="riesgos-lista">
            {riesgosFiltrados.map((r, index) => (
              <li key={index} className="riesgo-item">
                <p><strong>Nombre:</strong> {r.nombre}</p>
                <p><strong>Tipo:</strong> {r.tipo}</p>
                <p><strong>Nivel:</strong> {r.nivel}</p>
                <p><strong>Área:</strong> {r.area}</p>
                <p><strong>Descripción:</strong> {r.descripcion}</p>
                {r.archivoUrl && (
                  <p>
                    <strong>Archivo:</strong>{" "}
                    <a href={r.archivoUrl} target="_blank" rel="noopener noreferrer">
                      {r.archivoNombre}
                    </a>
                  </p>
                )}
                <div className="acciones">
                  <button onClick={() => handleEdit(r)}>Editar</button>
                  <button onClick={() => handleDelete(r._id)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GestionRiesgos;



