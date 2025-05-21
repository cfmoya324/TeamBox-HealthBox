const mongoose = require("mongoose");

const RiesgoSchema = new mongoose.Schema({
  nombre: String,
  tipo: String,
  nivel: { type: String, enum: ["bajo", "medio", "alto"] },
  area: String,
  descripcion: String,
  archivoUrl: String,
  archivoNombre: String,
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Riesgo", RiesgoSchema);

