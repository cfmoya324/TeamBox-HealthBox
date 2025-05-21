const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  nombre: String,
  responsable: String,
  area: String,
  descripcion: String,
  estado: { type: String, enum: ["pendiente", "en progreso", "completado"], default: "pendiente" },
  fechaCompromiso: Date,
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model("PlanAccion", PlanSchema);

