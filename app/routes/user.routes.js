// Importa Express
import express from "express";

// Importa controladores
import {
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard,
} from "../controllers/user.controller.js";

// Importa middlewares de autenticación
import {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin,
} from "../middlewares/authJwt.js";

// Crea router
const router = express.Router();

// Ruta pública
router.get("/all", allAccess);

// Ruta para usuarios autenticados
router.get("/user", [verifyToken], userBoard);

// Ruta para moderadores
router.get("/mod", [verifyToken, isModerator], moderatorBoard);

// Ruta para administradores
router.get("/admin", [verifyToken, isAdmin], adminBoard);

// Exporta router
export default router;