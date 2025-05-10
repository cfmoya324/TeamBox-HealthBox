import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/LoginAndRegister.css"; 

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users", {
        fullName,
        email,
        password
      });

      alert(`✅ ${res.data.message}`);
      navigate("/"); // Redirige al login
    } catch (error) {
        console.error("❌ Error completo:", error.response?.data || error.message);
        alert(`❌ ${error.response?.data?.message || "Error al registrar usuario"}`);
    }
  };

  return (
    <div className="login-container register-background">
      <div>
        <div className="login-box">
          <h2>Crear una cuenta</h2>
          <form onSubmit={handleRegister}>
            <input type="text" placeholder="Nombre completo" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
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
            <button type="submit">Registrarse</button>
          </form>
        </div>
        <p className="no-cuenta">
          ¿Ya tienes cuenta?<Link to="/login">Inicia sesión</Link>
        </p>
      </div>

      <div></div>

    </div>
  );
}

export default Register;
