const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = "secreto123"; // 🔒 Clave secreta para JWT

// 📌 Base de datos en memoria (sin MongoDB)
const users = [
  { email: "admin@empresa.com", password: bcrypt.hashSync("admin123", 10), role: "admin" },
  { email: "director@empresa.com", password: bcrypt.hashSync("director123", 10), role: "director" },
  { email: "auditor@empresa.com", password: bcrypt.hashSync("auditor123", 10), role: "auditor" },
  { email: "supervisor@empresa.com", password: bcrypt.hashSync("supervisor123", 10), role: "supervisor" },
  { email: "trabajador@empresa.com", password: bcrypt.hashSync("trabajador123", 10), role: "trabajador" }
];

// 🚀 Endpoint para iniciar sesión
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Buscar usuario en la base de datos en memoria
  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(400).json({ message: "Usuario no encontrado" });
  }

  // Comparar la contraseña ingresada con la almacenada
  const isMatch = bcrypt.compareSync(password, user.password);
  console.log("Contraseña ingresada:", password);
  console.log("Contraseña en DB:", user.password);
  console.log("Coincide:", isMatch);

  if (!isMatch) {
    return res.status(400).json({ message: "Contraseña incorrecta" });
  }

  // Generar token JWT
  const token = jwt.sign({ email: user.email, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

  res.json({ token, role: user.role });
});

// 🚀 Endpoint para obtener todos los usuarios (Solo para pruebas)
app.get("/users", (req, res) => {
  const usersList = users.map(user => ({ email: user.email, role: user.role }));
  res.json(usersList);
});

// Iniciar servidor en puerto 
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Backend corriendo en http://localhost:${PORT}`));
