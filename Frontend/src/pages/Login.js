import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Importa los estilos

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // 🔹 Redirigir según el rol del usuario
      switch (res.data.role) {
        case "admin":
          navigate("/admin");
          break;
        case "auditor":
          navigate("/auditor");
          break;
        case "supervisor":
          navigate("/supervisor");
          break;
        case "trabajador":
          navigate("/trabajador");
          break;
        default:
          navigate("/dashboard"); // Redirección por defecto
          break;
      }
    } catch (error) {
      alert("Error: Credenciales incorrectas");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
