const {defaultQuestions, SelfAssessment} = require("../models/selfAssessment.model");
const { sendEmail } = require("../utils/emailService");
const { generateSelfAssessmentPDF } = require("../utils/pdfGenerator");
const User = require("../models/user.model");
const path = require("path");

exports.createAssessment = async (req, res) => {
  try {
    const { standard, questions } = req.body;
    const newAssessment = new SelfAssessment({
      standard,
      createdBy: req.user.id,
      questions,
    });

    await newAssessment.save();
    res.status(201).json({ message: "Autoevaluación creada", data: newAssessment });
  } catch (error) {
    console.error("❌ Error creando autoevaluación:", error);
    res.status(500).json({ message: "Error al crear la autoevaluación" });
  }
};

exports.getAssessmentsByUser = async (req, res) => {
  try {
    const assessments = await SelfAssessment.find({ createdBy: req.user.id });
    res.status(200).json(assessments);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener autoevaluaciones" });
  }
};

exports.getDefaultQuestions = async (req, res) => {
  try {
    const { standard } = req.params;
    console.log("✅ Solicitando preguntas para:", standard);
    const questionsRaw = await defaultQuestions.find({standard: standard, isAnswered: false}).lean();

    if (!questionsRaw) {
      return res.status(404).json({ message: `No hay preguntas predefinidas para ${standard}` });
    }

    let questions = [];

    for (let question of questionsRaw) {
      questions.push({...question, isAnswered: true })
    }
    console.log("❓ Preguntas encontradas:", questions);
    res.status(200).json({ standard, questions });

  } catch (error) {
    console.error("❌ Error en preguntas de autoevaluación:", error);
    res.status(500).json({ message: "Error en preguntas de autoevaluación." });
  }
};

exports.exportAssessmentAndSend = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    const assessment = await SelfAssessment.findOne({ createdBy: userId }).sort({ createdAt: -1 });

    if (!assessment) return res.status(404).json({ message: "Autoevaluación no encontrada" });

    const outputPath = path.join(__dirname, `../temp/auto_${userId}.pdf`);
    await generateSelfAssessmentPDF(assessment, outputPath);

    await sendEmail(
      user.email,
      "📄 Tu autoevaluación de HealthBox en PDF",
      `<p>Hola ${user.fullName},<br>Adjuntamos el PDF con tu autoevaluación realizada en HealthBox.</p>`,
      [{ filename: "autoevaluacion.pdf", path: outputPath }]
    );

    res.status(200).json({ message: "PDF generado y enviado por correo" });

  } catch (error) {
    console.error("❌ Error exportando PDF:", error);
    res.status(500).json({ message: "Error al generar y enviar el PDF" });
  }
};
