const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  text: String,
  type: { type: String, enum: ["abierta", "si_no", "escala"], default: "si_no" },
  response: String,
});

const SelfAssessmentSchema = new mongoose.Schema({
  standard: { type: String, required: true }, // ISO 45001, ISO 9001, etc.
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  questions: [QuestionSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SelfAssessment", SelfAssessmentSchema);
