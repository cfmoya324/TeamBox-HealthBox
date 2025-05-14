require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail", 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (to, subject, htmlContent, attachments = []) => {
  const mailOptions = {
    from: `"HealthBox Notificaciones" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html: htmlContent,
    attachments,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📩 Correo enviado a ${to}`);
  } catch (error) {
    console.error("❌ Error al enviar el correo:", error);
  }
};

module.exports = { sendEmail };
