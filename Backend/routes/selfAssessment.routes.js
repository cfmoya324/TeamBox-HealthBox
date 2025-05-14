const express = require("express");
const router = express.Router();
const controller = require("../controllers/selfAssessment.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/", verifyToken, controller.createAssessment);
router.get("/", verifyToken, controller.getAssessmentsByUser);
router.get("/questions/:standard", verifyToken, controller.getDefaultQuestions);
router.post("/export", verifyToken, controller.exportAssessmentAndSend);


module.exports = router;
