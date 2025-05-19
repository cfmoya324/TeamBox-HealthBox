import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/SelfAssessment.css";

function SelfAssessment() {
  const [standard, setStandard] = useState("");
  const [standards, setStandards] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [enviarCorreo, setEnviarCorreo] = useState(false);
  const navigate = useNavigate();

  const escalaLabels = ["Muy deficiente", "Deficiente", "Aceptable", "Bueno", "Excelente"];

  // Obtener normativas al iniciar
  useEffect(() => {
    const fetchStandards = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/standards", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setStandards(res.data);
        if (res.data.length > 0) {
          setStandard(res.data[0].name);
        }
      } catch (error) {
        console.error("❌ Error al cargar normativas:", error);
      }
    };

    fetchStandards();
  }, []);

  // Cargar preguntas cada vez que cambie la normativa seleccionada
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "auditor") {
      alert("⚠️ Acceso denegado. Solo auditores pueden entrar.");
      navigate("/");
      return;
    }

    if (!standard) return;

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

      if (enviarCorreo) {
        exportarPDF();
      }
    } catch (error) {
      console.error("❌ Error al guardar la autoevaluación:", error);
      alert("❌ Error al guardar la autoevaluación.");
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
      setMensaje("✅📧 Autoevaluación guardada, exportada y enviada por correo.");
    } catch (error) {
      console.error("❌ Error exportando PDF:", error);
      alert("❌ Error al exportar la autoevaluación.");
    }
  };

  return (
    <div className="auto-container">
      <button className="volver" onClick={() => navigate("/auditor")}>Volver al Panel</button>
      <h2>Autoevaluación - {standard}</h2>

      <div className="standard-selector">
        <span>Norma<br />escogida:</span>
        <select value={standard} onChange={(e) => setStandard(e.target.value)}>
          {standards.map((std) => (
            <option key={std._id} value={std.name}>{std.name}</option>
          ))}
        </select>
      </div>

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

        <div>
          <input
            type="checkbox"
            id="correo"
            name="correo"
            checked={enviarCorreo}
            onChange={(e) => setEnviarCorreo(e.target.checked)}
          />
          <label htmlFor="correo"> Exportar evaluación a PDF y enviarlo a tu correo.</label>
        </div>

        <button type="submit" className="submit-btn">
          Enviar autoevaluación
        </button>
      </form>

      {mensaje !== '' ? (<p className="msg">{mensaje}</p>) : (<span />)}
    </div>
  );
}

export default SelfAssessment;

