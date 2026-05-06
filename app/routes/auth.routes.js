// Importa Express para definir rutas
import express from "express";

// Importa las funciones del controlador de autenticación
import { signup, signin } from "../controllers/auth.controller.js";

// Importa los middlewares de validación
import {
  checkDuplicateUsernameOrEmail, // Verifica duplicados
  checkRolesExisted,             // Verifica roles válidos
} from "../middlewares/verifySignUp.js";

// Crea un router
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post(
  "/signup",
  [checkDuplicateUsernameOrEmail, checkRolesExisted],
  signup
);

// Ruta para iniciar sesión
router.post("/signin", signin);

// Exporta el router
export default router;