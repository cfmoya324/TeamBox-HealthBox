const express = require("express");
const router = express.Router();
const controller = require("../controllers/riesgo.controller");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.get("/", controller.obtenerRiesgos);
router.post("/", upload.single("archivo"), controller.crearRiesgo);
router.put("/:id", upload.single("archivo"), controller.actualizarRiesgo);
router.delete("/:id", controller.eliminarRiesgo);

module.exports = router;



