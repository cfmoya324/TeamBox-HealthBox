import React, { useState } from "react";
import "../styles/AdminUsuarios.css";

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Juan Pérez", correo: "juan@mail.com", contraseña: "123456" },
    { id: 2, nombre: "Ana López", correo: "ana@mail.com", contraseña: "abcdef" },
    { id: 3, nombre: "Carlos García", correo: "carlos@mail.com", contraseña: "password" }
  ]);

  const [form, setForm] = useState({ nombre: "", correo: "", contraseña: "" });
  const [editandoId, setEditandoId] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

  const crearUsuario = () => {
    const nuevoUsuario = {
      id: Date.now(),
      ...form,
    };
    setUsuarios([...usuarios, nuevoUsuario]);
    setForm({ nombre: "", correo: "", contraseña: "" });
  };

  const actualizarUsuario = (id) => {
    setUsuarios(
      usuarios.map((u) =>
        u.id === id ? { ...u, nombre: form.nombre, contraseña: form.contraseña } : u
      )
    );
    setEditandoId(null);
  };

  const eliminarUsuario = (id) => {
    setUsuarios(usuarios.filter((u) => u.id !== id));
  };

  const usuariosFiltrados = usuarios.filter((u) =>
    u.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="admin-container">
      <h2 className="admin-title">Gestión de Usuarios</h2>

      {/* Campo de búsqueda */}
      <input
        className="admin-input"
        type="text"
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChange={handleBusquedaChange}
        style={{ marginBottom: "20px", width: "100%", maxWidth: "400px" }}
      />

      <table className="admin-table">
        <thead>
          <tr>
            <th>Correo</th>
            <th>Nombre</th>
            <th>Contraseña</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.map((usuario) => (
            <tr key={usuario.id} className="admin-row">
              <td>{usuario.correo}</td>
              <td>
                {editandoId === usuario.id ? (
                  <input
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    className="admin-input"
                  />
                ) : (
                  usuario.nombre
                )}
              </td>
              <td>
                {editandoId === usuario.id ? (
                  <input
                    name="contraseña"
                    type="password"
                    value={form.contraseña}
                    onChange={handleChange}
                    className="admin-input"
                  />
                ) : (
                  "••••••"
                )}
              </td>
              <td className="admin-actions">
                {editandoId === usuario.id ? (
                  <button
                    className="guardar"
                    onClick={() => actualizarUsuario(usuario.id)}
                  >
                    Guardar
                  </button>
                ) : (
                  <button
                    className="editar"
                    onClick={() => {
                      setEditandoId(usuario.id);
                      setForm({
                        nombre: usuario.nombre,
                        contraseña: "",
                        correo: usuario.correo,
                      });
                    }}
                  >
                    Editar
                  </button>
                )}
                <button
                  className="eliminar"
                  onClick={() => eliminarUsuario(usuario.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="admin-form">
        <h3>Nuevo Usuario</h3>
        <div>
          <input
            className="admin-input"
            name="correo"
            placeholder="Correo"
            value={form.correo}
            onChange={handleChange}
          />
          <input
            className="admin-input"
            name="nombre"
            placeholder="Nombre Completo"
            value={form.nombre}
            onChange={handleChange}
          />
          <input
            className="admin-input"
            name="contraseña"
            type="password"
            placeholder="Contraseña"
            value={form.contraseña}
            onChange={handleChange}
          />
          <button className="crear" onClick={crearUsuario}>
            Crear Usuario
          </button>
        </div>
      </div>
    </div>
  );
}
