const express = require('express');

const authController = require("../controllers/auth.controller");

const router = express.Router();

// créer un utilisateur
router.post("/register", authController.register);

// se connecter
router.post("/login", authController.login);

// se déconnecter
router.post("/logout", authController.logout);

module.exports = router;