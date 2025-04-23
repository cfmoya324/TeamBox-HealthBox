import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Login.css"; // Importa los estilos

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
          <div style={{ position: "relative", width: "100%", maxWidth: "300px", margin: "10px auto" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 40px 12px 12px",
                border: "1px solid #3a3a3d",
                backgroundColor: "#2b2d31",
                color: "#fff",
                borderRadius: "5px",
                fontSize: "16px",
                outline: "none",
                boxSizing: "border-box"
              }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#ccc",
                cursor: "pointer",
                fontSize: "18px"
              }}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <button type="submit">Ingresar</button>
        </form>
        <p style={{ color: "#ccc", marginTop: "15px" }}>
          ¿No tienes cuenta? <span style={{ color: "#5865f2", cursor: "pointer" }} onClick={() => navigate("/register")}>Regístrate</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
