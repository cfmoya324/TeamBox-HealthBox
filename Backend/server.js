require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");


const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/self-assessments", require("./routes/selfAssessment.routes"));
app.use("/api/questions", require("./routes/question.routes"));
app.use("/api/standards", require("./routes/standard.routes"));
app.use("/api/riesgos", require("./routes/riesgo.routes"));
app.use("/api/planes", require("./routes/planAccion.routes"));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});



