const express = require("express");
const router = express.Router();
const controller = require("../controllers/question.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.get("/", verifyToken, controller.getAllQuestions);
router.post("/", verifyToken, controller.createQuestion);
router.put("/:id", verifyToken, controller.updateQuestion);
router.delete("/:id", verifyToken, controller.deleteQuestion);

module.exports = router;
