const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { ROLES } = require("../config/constants");

exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!ROLES.includes(role)) {
      return res.status(400).json({ message: "Rol inválido" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
    });
    console.log("👉 Registrando usuario:", newUser);
    await newUser.save();
    const saved = await newUser.save();
    console.log("✅ Usuario guardado:", saved);

    res.status(201).json({
      message: "Usuario registrado exitosamente.",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
      }
    });
  } catch (error) {
    console.error("❌ Error al registrar usuario:", error);
    res.status(500).json({ message: "Error del servidor al registrar usuario." });
  }
};

