const Standard = require("../models/standard.model");

exports.getStandards = async (req, res) => {
  try {
    const standards = await Standard.find();
    res.status(200).json(standards);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener normativas" });
  }
};

exports.createStandard = async (req, res) => {
  try {
    const { name } = req.body;
    const exists = await Standard.findOne({ name });
    if (exists) return res.status(400).json({ message: "Ya existe esta normativa" });

    const nueva = new Standard({ name });
    await nueva.save();
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ message: "Error al crear normativa" });
  }
};

exports.updateStandard = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updated = await Standard.findByIdAndUpdate(id, { name }, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar normativa" });
  }
};

exports.deleteStandard = async (req, res) => {
  try {
    const { id } = req.params;
    await Standard.findByIdAndDelete(id);
    res.status(200).json({ message: "Normativa eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar normativa" });
  }
};

