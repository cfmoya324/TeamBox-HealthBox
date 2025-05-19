import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminPreguntas.css";

function AdminPreguntas() {
  const [preguntas, setPreguntas] = useState([]);
  const [normativas, setNormativas] = useState([]);
  const [selectedStandard, setSelectedStandard] = useState("ISO 45001");
  const [nuevaNormativa, setNuevaNormativa] = useState("");
  const [nuevaPregunta, setNuevaPregunta] = useState({
    standard: "ISO 45001",
    text: "",
    type: "si_no",
  });
  const [editandoId, setEditandoId] = useState(null);
  const [edicion, setEdicion] = useState({});

  const fetchPreguntas = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/questions", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPreguntas(res.data);
    } catch (error) {
      console.error("❌ Error al obtener preguntas:", error);
    }
  };

  const fetchNormativas = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/standards", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setNormativas(res.data);
    } catch (error) {
      console.error("❌ Error al obtener normativas:", error);
    }
  };

  useEffect(() => {
    fetchPreguntas();
    fetchNormativas();
  }, []);

  const handleInputChange = (e) => {
    setNuevaPregunta({ ...nuevaPregunta, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEdicion({ ...edicion, [e.target.name]: e.target.value });
  };

  const crearPregunta = async () => {
    try {
      await axios.post("http://localhost:5000/api/questions", nuevaPregunta, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setNuevaPregunta({ ...nuevaPregunta, text: "" });
      fetchPreguntas();
    } catch (error) {
      console.error("❌ Error al crear pregunta:", error);
    }
  };

  const actualizarPregunta = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/questions/${id}`, edicion, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setEditandoId(null);
      fetchPreguntas();
    } catch (error) {
      console.error("❌ Error al actualizar pregunta:", error);
    }
  };

  const eliminarPregunta = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/questions/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchPreguntas();
    } catch (error) {
      console.error("❌ Error al eliminar pregunta:", error);
    }
  };

  const agregarNormativa = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/standards",
        { name: nuevaNormativa },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const nueva = res.data;
      setNormativas((prev) => [...prev, nueva]);
      setNuevaPregunta({ ...nuevaPregunta, standard: nueva.name });
      setSelectedStandard(nueva.name);
      setNuevaNormativa("");
    } catch (error) {
      alert(error.response?.data?.message || "Error al agregar normativa");
    }
  };

  const actualizarNormativa = async (id, nuevoNombre) => {
    try {
      await axios.put(
        `http://localhost:5000/api/standards/${id}`,
        { name: nuevoNombre },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNormativas((prev) =>
        prev.map((n) => (n._id === id ? { ...n, name: nuevoNombre } : n))
      );
      alert("✅ Normativa actualizada");
    } catch (err) {
      alert("❌ Error al actualizar normativa");
      console.error(err);
    }
  };

  const eliminarNormativa = async (id) => {
    try {
      const normativaEliminada = normativas.find((n) => n._id === id);
      await axios.delete(`http://localhost:5000/api/standards/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const nuevasNormas = normativas.filter((n) => n._id !== id);
      setNormativas(nuevasNormas);

      // Si la que se eliminó era la seleccionada, actualizar
      if (selectedStandard === normativaEliminada.name && nuevasNormas.length > 0) {
        setSelectedStandard(nuevasNormas[0].name);
        setNuevaPregunta({ ...nuevaPregunta, standard: nuevasNormas[0].name });
      }

      alert("✅ Normativa eliminada");
    } catch (err) {
      alert("❌ Error al eliminar normativa");
      console.error(err);
    }
  };

  return (
    <div className="admin-preguntas-container">
      <h2>Gestión de Preguntas de Autoevaluación</h2>

      <div className="crear-form">
        <h3>Agregar Nueva Pregunta</h3>
        <input
          name="text"
          value={nuevaPregunta.text}
          onChange={handleInputChange}
          placeholder="Texto de la pregunta"
        />
        <select
          name="standard"
          value={nuevaPregunta.standard}
          onChange={(e) => {
            handleInputChange(e);
            setSelectedStandard(e.target.value);
          }}
        >
          {normativas.map((n) => (
            <option key={n._id} value={n.name}>
              {n.name}
            </option>
          ))}
        </select>
        <select name="type" value={nuevaPregunta.type} onChange={handleInputChange}>
          <option value="si_no">Sí / No</option>
          <option value="abierta">Abierta</option>
          <option value="escala">Escala</option>
        </select>
        <button onClick={crearPregunta}>Crear</button>

        <div className="nueva-normativa">
          <input
            type="text"
            placeholder="Nueva normativa (ej: ISO 31000)"
            value={nuevaNormativa}
            onChange={(e) => setNuevaNormativa(e.target.value)}
          />
          <button onClick={agregarNormativa}>Agregar Normativa</button>
        </div>
      </div>

      <div className="normativas-section">
        <h4>Editar o Eliminar Normativas</h4>
        {normativas.map((norma, index) => (
          <div className="normativa-item" key={index}>
            <input
              type="text"
              value={norma.name}
              onChange={(e) => {
                const actualizado = [...normativas];
                actualizado[index].name = e.target.value;
                setNormativas(actualizado);
              }}
            />
            <button
              className="actualizar"
              onClick={() => actualizarNormativa(norma._id, norma.name)}
            >
              Actualizar
            </button>
            <button
              className="eliminar"
              onClick={() => {
                if (window.confirm("¿Seguro que deseas eliminar esta normativa?")) {
                  eliminarNormativa(norma._id);
                }
              }}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <div className="lista-preguntas">
        <h3>Preguntas Registradas</h3>
        {preguntas
          .filter((p) => p.standard === selectedStandard)
          .map((p) => (
            <div key={p._id} className="pregunta-item">
              {editandoId === p._id ? (
                <>
                  <input name="text" value={edicion.text} onChange={handleEditChange} />
                  <select name="type" value={edicion.type} onChange={handleEditChange}>
                    <option value="si_no">Sí / No</option>
                    <option value="abierta">Abierta</option>
                    <option value="escala">Escala</option>
                  </select>
                  <button onClick={() => actualizarPregunta(p._id)}>Guardar</button>
                  <button onClick={() => setEditandoId(null)}>Cancelar</button>
                </>
              ) : (
                <>
                  <strong>[{p.standard}]</strong> {p.text} <em>({p.type})</em>
                  <button
                    onClick={() => {
                      setEditandoId(p._id);
                      setEdicion(p);
                    }}
                  >
                    Editar
                  </button>
                  <button onClick={() => eliminarPregunta(p._id)}>Eliminar</button>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default AdminPreguntas;






