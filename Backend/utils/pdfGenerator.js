const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const escalaLabels = {
  1: "Muy deficiente",
  2: "Deficiente",
  3: "Aceptable",
  4: "Bueno",
  5: "Excelente"
};

const generateSelfAssessmentPDF = (assessment, outputPath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(outputPath);

    doc.pipe(stream);

    doc.fontSize(20).text("Reporte de Autoevaluación", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Norma: ${assessment.standard}`);
    doc.text(`Fecha: ${new Date().toLocaleString()}`);
    doc.moveDown();

    assessment.questions.forEach((q, idx) => {
      doc.fontSize(12).text(`${idx + 1}. ${q.text}`);

      let respuesta = q.response;

      // Si es tipo escala y la respuesta es 1 a 5, reemplazar con valor textual
      if (q.type === "escala" && escalaLabels[respuesta]) {
        respuesta = `${respuesta} - ${escalaLabels[respuesta]}`;
      }

      doc.font("Helvetica-Bold").text(`Respuesta: ${respuesta || "No respondida"}`, { indent: 20 });
      doc.moveDown();
    });

    doc.end();

    stream.on("finish", () => resolve(outputPath));
    stream.on("error", reject);
  });
};

module.exports = { generateSelfAssessmentPDF };

