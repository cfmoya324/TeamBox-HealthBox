const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword
    });

    const saved = await newUser.save();

    res.status(201).json({
      message: "Usuario registrado exitosamente.",
      user: {
        id: saved._id,
        fullName: saved.fullName,
        email: saved.email,
        role: saved.role,
      }
    });
  } catch (error) {
    console.error("❌ Error al registrar usuario:", error);
    res.status(500).json({ message: error.message || "Error del servidor al registrar usuario." });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, password } = req.body;

    const updateFields = { fullName };
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updateFields.password = hashed;
    }

    const updated = await User.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario actualizado", user: updated });
  } catch (error) {
    console.error("❌ Error al actualizar usuario:", error);
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    console.error("❌ Error al eliminar usuario:", error);
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const validRoles = ["administrador", "auditor", "supervisor", "trabajador"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Rol inválido" });
    }

    const updated = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!updated) return res.status(404).json({ message: "Usuario no encontrado" });

    res.status(200).json({ message: "Rol actualizado correctamente", user: updated });
  } catch (error) {
    console.error("❌ Error al cambiar rol:", error);
    res.status(500).json({ message: "Error al actualizar rol del usuario" });
  }
};

