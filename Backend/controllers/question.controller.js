const { defaultQuestions } = require("../models/selfAssessment.model");

exports.createQuestion = async (req, res) => {
  try {
    const { standard, text, type } = req.body;
    const nueva = await defaultQuestions.create({ standard, text, type, isAnswered: false });
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ message: "Error al crear pregunta", error: err.message });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const preguntas = await defaultQuestions.find();
    res.status(200).json(preguntas);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener preguntas" });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizada = await defaultQuestions.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(actualizada);
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar pregunta" });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    await defaultQuestions.findByIdAndDelete(id);
    res.status(200).json({ message: "Pregunta eliminada" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar pregunta" });
  }
};
