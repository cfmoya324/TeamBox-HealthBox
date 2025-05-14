import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/AdminUsuarios.css";

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ fullName: "", email: "", password: "", role: "trabajador" });
  const [editandoId, setEditandoId] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "administrador") {
      alert("⚠️ Acceso denegado. Solo administradores pueden entrar.");
      navigate("/");
    }
    fetchUsuarios();
  }, [navigate]);

  const fetchUsuarios = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setUsuarios(res.data);
    } catch (error) {
      console.error("❌ Error al cargar usuarios:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

  const crearUsuario = async () => {
    try {
      await axios.post("http://localhost:5000/api/users", {
        fullName: form.fullName,
        email: form.email,
        password: form.password
      });
      await fetchUsuarios();
      setForm({ fullName: "", email: "", password: "", role: "trabajador" });
    } catch (error) {
      console.error("❌ Error al crear usuario:", error);
      alert("Error al crear usuario");
    }
  };

  const actualizarUsuario = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${id}`, {
        fullName: form.fullName,
        password: form.password
      });
      await axios.patch(`http://localhost:5000/api/users/${id}/role`, {
        role: form.role
      });
      await fetchUsuarios();
      setEditandoId(null);
      setForm({ fullName: "", email: "", password: "", role: "trabajador" });
    } catch (error) {
      console.error("❌ Error al actualizar:", error);
    }
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setForm({ fullName: "", email: "", password: "", role: "trabajador" });
  };

  const eliminarUsuario = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      await fetchUsuarios();
    } catch (error) {
      console.error("❌ Error al eliminar usuario:", error);
    }
  };

  const usuariosFiltrados = usuarios.filter((u) =>
    u.fullName?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="admin-container">
      <button className="volver" onClick={() => navigate("/administrador")}>Volver al Panel</button>
      <h2 className="admin-title">Gestión de Usuarios</h2>

      <input
        className="admin-input"
        type="text"
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChange={handleBusquedaChange}
      />

      <table className="admin-table">
        <thead>
          <tr>
            <th>Correo</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.map((usuario) => (
            <tr key={usuario._id}>
              <td>{usuario.email}</td>
              <td>
                {editandoId === usuario._id ? (
                  <input name="fullName" value={form.fullName} onChange={handleChange} className="admin-input" />
                ) : (
                  usuario.fullName
                )}
              </td>
              <td>
                {editandoId === usuario._id ? (
                  <select name="role" value={form.role} onChange={handleChange} className="admin-input">
                    <option value="trabajador">Trabajador</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="auditor">Auditor</option>
                    <option value="administrador">Administrador</option>
                  </select>
                ) : (
                  usuario.role
                )}
              </td>
              <td>
                {editandoId === usuario._id ? (
                  <>
                    <div className="password-wrapper">
                      <input
                        name="password"
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Nueva contraseña"
                        value={form.password}
                        onChange={handleChange}
                        className="admin-input"
                      />
                      <span className="eye-icon" onClick={() => setShowNewPassword(!showNewPassword)}>
                        {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    </div>
                    <button className="guardar" onClick={() => actualizarUsuario(usuario._id)}>Guardar</button>
                    <button className="cancelar" onClick={cancelarEdicion}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button className="editar" onClick={() => {
                      setEditandoId(usuario._id);
                      setForm({
                        fullName: usuario.fullName,
                        email: usuario.email,
                        password: "",
                        role: usuario.role
                      });
                    }}>Editar</button>
                    <button className="eliminar" onClick={() => eliminarUsuario(usuario._id)}>Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="admin-form">
        <h3>Nuevo Usuario</h3>
        <input className="admin-input" name="email" placeholder="Correo" value={form.email} onChange={handleChange} />
        <input className="admin-input" name="fullName" placeholder="Nombre completo" value={form.fullName} onChange={handleChange} />
        <div className="password-wrapper">
          <input
            className="admin-input"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
          />
          <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <button className="crear" onClick={crearUsuario}>Crear Usuario</button>
      </div>
    </div>
  );
}




