const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// Registrar nuevo usuario (HU-01)
router.post("/", userController.registerUser);

module.exports = router;