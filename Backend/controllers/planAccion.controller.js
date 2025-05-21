const Plan = require("../models/planAccion.model");

exports.getAllPlanes = async (req, res) => {
  try {
    const planes = await Plan.find().sort({ fecha: -1 });
    res.json(planes);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener planes" });
  }
};

exports.createPlan = async (req, res) => {
  try {
    const nuevo = new Plan(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ message: "Error al crear plan" });
  }
};

exports.updatePlan = async (req, res) => {
  try {
    const actualizado = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar plan" });
  }
};

exports.deletePlan = async (req, res) => {
  try {
    await Plan.findByIdAndDelete(req.params.id);
    res.json({ message: "Plan eliminado" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar plan" });
  }
};

