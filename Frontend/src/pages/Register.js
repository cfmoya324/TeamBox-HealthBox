import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Login.css"; 

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
    <div className="login-container">
      <div className="login-box">
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Nombre completo" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <div style={{ position: "relative", width: "100%", maxWidth: "300px", margin: "10px auto"}}>
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
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
