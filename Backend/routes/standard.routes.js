const express = require("express");
const router = express.Router();
const controller = require("../controllers/standard.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.get("/", verifyToken, controller.getStandards);
router.post("/", verifyToken, controller.createStandard);
router.put("/:id", verifyToken, controller.updateStandard);
router.delete("/:id", verifyToken, controller.deleteStandard);


module.exports = router;
