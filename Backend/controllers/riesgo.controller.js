const Riesgo = require("../models/riesgo.model");
const path = require("path");
const fs = require("fs");

// Crear nuevo riesgo
exports.crearRiesgo = async (req, res) => {
  try {
    const { nombre, tipo, nivel, area, descripcion } = req.body;
    let archivoNombre = "";
    let archivoUrl = "";

    if (req.file) {
      archivoNombre = req.file.originalname;
      archivoUrl = `public/uploads/${req.file.filename}`;
    }

    const nuevo = new Riesgo({
      nombre,
      tipo,
      nivel,
      area,
      descripcion,
      archivoNombre,
      archivoUrl,
    });

    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (error) {
    console.error("❌ Error al crear riesgo:", error);
    res.status(500).json({ message: "Error al crear riesgo" });
  }
};

// Obtener todos
exports.obtenerRiesgos = async (req, res) => {
  try {
    const riesgos = await Riesgo.find().sort({ fecha: -1 });
    res.json(riesgos);
  } catch (error) {
    console.error("❌ Error al obtener riesgos:", error);
    res.status(500).json({ message: "Error al obtener riesgos" });
  }
};

// Actualizar riesgo (incluyendo archivo)
exports.actualizarRiesgo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, tipo, nivel, area, descripcion } = req.body;

    let updateData = { nombre, tipo, nivel, area, descripcion };

    if (req.file) {
      updateData.archivoNombre = req.file.originalname;
      updateData.archivoUrl = `public/uploads/${req.file.filename}`;
    }

    const actualizado = await Riesgo.findByIdAndUpdate(id, updateData, { new: true });
    res.json(actualizado);
  } catch (error) {
    console.error("❌ Error al actualizar riesgo:", error);
    res.status(500).json({ message: "Error al actualizar riesgo" });
  }
};

// Eliminar riesgo
exports.eliminarRiesgo = async (req, res) => {
  try {
    const { id } = req.params;
    await Riesgo.findByIdAndDelete(id);
    res.json({ message: "Riesgo eliminado" });
  } catch (error) {
    console.error("❌ Error al eliminar riesgo:", error);
    res.status(500).json({ message: "Error al eliminar riesgo" });
  }
};


