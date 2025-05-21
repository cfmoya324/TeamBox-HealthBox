const express = require("express");
const router = express.Router();
const controller = require("../controllers/planAccion.controller");

router.get("/", controller.getAllPlanes);
router.post("/", controller.createPlan);
router.put("/:id", controller.updatePlan);
router.delete("/:id", controller.deletePlan);

module.exports = router;

