const express = require('express');

const authMiddleware = require("../middlewares/auth.middleware");
const permissionMiddleware = require("../middlewares/permission.middleware");
const userController = require("../controllers/user.controller");

const router = express.Router();

// obtenir tous les utilisateurs
router.get("/", authMiddleware.isAuth, permissionMiddleware.canGetUsers, userController.getAll);

// obtenir un utilisateur
router.get("/:_id", authMiddleware.isAuth, permissionMiddleware.canGetUser, userController.get);

// éditer un utilisateur
router.put("/:_id", authMiddleware.isAuth, permissionMiddleware.canEditUser, permissionMiddleware.canEditRole, permissionMiddleware.canEditPassword, userController.edit);

// supprimer un utilisateur
router.delete("/:_id", authMiddleware.isAuth, permissionMiddleware.canDeleteUser, userController.delete);

module.exports = router;