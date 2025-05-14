import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/SelfAssessment.css";

function SelfAssessment() {
  const [standard, setStandard] = useState("ISO 45001");
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "auditor") {
      alert("⚠️ Acceso denegado. Solo auditores pueden entrar.");
      navigate("/");
      return;
    }

    const fetchPreguntas = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/self-assessments/questions/${standard}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setQuestions(res.data.questions);
        setResponses({});
        setMensaje("");
      } catch (error) {
        console.error("❌ Error cargando preguntas:", error);
      }
    };
    fetchPreguntas();
  }, [standard]);

  const handleChange = (e, index) => {
    setResponses({ ...responses, [index]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = questions.map((q, i) => ({
      ...q,
      response: responses[i] || "",
    }));

    try {
      await axios.post(
        "http://localhost:5000/api/self-assessments",
        {
          standard,
          questions: payload,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMensaje("✅ Autoevaluación guardada exitosamente.");
    } catch (error) {
      console.error("❌ Error al enviar autoevaluación:", error);
      setMensaje("❌ Error al guardar la autoevaluación.");
    }
  };

  const exportarPDF = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/self-assessments/export",
        { standard },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("📧 Autoevaluación exportada y enviada por correo.");
    } catch (error) {
      console.error("❌ Error exportando PDF:", error);
      alert("❌ Error al exportar la autoevaluación.");
    }
  };

  const escalaLabels = ["Muy deficiente", "Deficiente", "Aceptable", "Bueno", "Excelente"];

  return (
    <div className="auto-container">
      <h2>Autoevaluación - {standard}</h2>

      <select
        value={standard}
        onChange={(e) => setStandard(e.target.value)}
        className="standard-selector"
      >
        <option value="ISO 45001">ISO 45001</option>
        <option value="ISO 9001">ISO 9001</option>
        <option value="ISO 27001">ISO 27001</option>
      </select>

      <form onSubmit={handleSubmit} className="form-auto">
        {questions.map((q, i) => (
          <div key={i} className="question-block">
            <label>{q.text}</label>
            {q.type === "si_no" ? (
              <select
                value={responses[i] || ""}
                onChange={(e) => handleChange(e, i)}
              >
                <option value="">Seleccione</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
            ) : q.type === "escala" ? (
              <div className="scale-wrapper">
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={responses[i] || 3}
                  onChange={(e) => handleChange(e, i)}
                />
                <div className="scale-labels">
                  {escalaLabels.map((label, idx) => (
                    <span key={idx} className="scale-label">{label}</span>
                  ))}
                </div>
              </div>
            ) : (
              <textarea
                value={responses[i] || ""}
                onChange={(e) => handleChange(e, i)}
              />
            )}
          </div>
        ))}
        <button type="submit" className="submit-btn">
          Enviar Autoevaluación
        </button>
      </form>

      <div className="buttons-container">
        <button className="export-btn" onClick={exportarPDF}>
          Exportar PDF por correo
        </button>
        <button className="volver" onClick={() => navigate("/auditor")}>
          Volver al Panel del auditor
        </button>
      </div>

      {mensaje && <p className="msg">{mensaje}</p>}
    </div>
  );
}

export default SelfAssessment;




