const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// Registrar nuevo usuario (HU-01)
router.post("/", userController.registerUser);

// Actualizar usuario por ID
router.put("/:id", userController.updateUser);

// Eliminar usuario por ID
router.delete("/:id", userController.deleteUser);

// Cambiar rol de usuario
router.patch("/:id/role", userController.updateUserRole);

module.exports = router;