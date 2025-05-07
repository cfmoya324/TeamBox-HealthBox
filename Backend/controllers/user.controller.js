const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { sendEmail } = require("../utils/emailService");
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

    // Enviar correo de bienvenida
    await sendEmail(
      email,
      "Bienvenido a HealthBox",
      `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Bienvenido a <span style="color:#007bff">HealthBox</span>, ${fullName}</h2>
          <p>Tu cuenta ha sido registrada exitosamente.</p>
          <p>Puedes iniciar sesión ahora y comenzar a usar la plataforma.</p>
          <hr />
          <small>Este mensaje fue generado automáticamente. No respondas a este correo.</small>
        </div>
      `
    );

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

    // Notificar por correo al usuario eliminado
    await sendEmail(
      deleted.email,
      "Cuenta eliminada - HealthBox",
      `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Hola ${deleted.fullName},</h2>
          <p>Te informamos que tu cuenta en <strong>HealthBox</strong> ha sido eliminada.</p>
          <p>Si crees que esto fue un error, por favor contacta con el administrador del sistema.</p>
          <hr />
          <small>Este mensaje fue generado automáticamente. No respondas a este correo.</small>
        </div>
      `
    );

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

    // Enviar correo de notificación de cambio de rol
    await sendEmail(
      updated.email,
      "Actualización de Rol en HealthBox",
      `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Hola ${updated.fullName},</h2>
          <p>Tu rol en la plataforma <strong>HealthBox</strong> ha sido actualizado a: <strong>${role}</strong>.</p>
          <p>Accede nuevamente al sistema para ver los cambios reflejados.</p>
          <hr />
          <small>Este mensaje fue generado automáticamente. No respondas a este correo.</small>
        </div>
      `
    );

    res.status(200).json({ message: "Rol actualizado correctamente", user: updated });
  } catch (error) {
    console.error("❌ Error al cambiar rol:", error);
    res.status(500).json({ message: "Error al actualizar rol del usuario" });
  }
};

