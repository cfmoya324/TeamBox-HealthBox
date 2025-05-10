import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/LoginAndRegister.css"; // Importa los estilos

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // 🔹 Redirigir según el rol del usuario
      switch (res.data.role) {
        case "administrador":
          navigate("/administrador");
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
    <div className="login-container login-background">
      <div>
        <div className="login-box">
          <h2>Iniciar sesión</h2>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <div className="show-password">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <button type="submit">Ingresar</button>
          </form>
        </div>
        <p className="no-cuenta">
          ¿No tienes cuenta?<Link to="/register">Regístrate</Link>
        </p>
      </div>

      <div></div>

    </div>
  );
}

export default Login;
