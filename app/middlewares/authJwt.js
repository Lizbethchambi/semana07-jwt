// Importamos el módulo jsonwebtoken para trabajar con JWT
import jwt from "jsonwebtoken";

// Importamos los modelos y constantes
import db from "../models/index.js";

// Importamos la configuración (clave secreta)
import authConfig from "../config/auth.config.js";

// Extraemos los modelos
const { user: User } = db;

/**
 * 🔐 Middleware: Verificar Token
 */
export const verifyToken = async (req, res, next) => {
  // Obtener token desde headers
  const token =
    req.headers["x-access-token"] || req.headers["authorization"];

  // Si no hay token
  if (!token) {
    return res.status(403).json({
      message: "¡No se proporcionó un token!",
    });
  }

  try {
    // Eliminar "Bearer " si existe
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      authConfig.secret
    );

    // Guardar ID del usuario
    req.userId = decoded.id;

    // Verificar si el usuario existe
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(401).json({
        message: "¡No autorizado!",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      message: "¡Token inválido!",
    });
  }
};

/**
 * 👑 Middleware: Solo Admin
 */
export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    const adminRole = roles.find((role) => role.name === "admin");

    if (adminRole) {
      next();
      return;
    }

    return res.status(403).json({
      message: "¡Se requiere rol de Administrador!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * 🧑‍💼 Middleware: Solo Moderator
 */
export const isModerator = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    const modRole = roles.find((role) => role.name === "moderator");

    if (modRole) {
      next();
      return;
    }

    return res.status(403).json({
      message: "¡Se requiere rol de Moderador!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * 👤 Middleware: Solo User
 */
export const isUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    const userRole = roles.find((role) => role.name === "user");

    if (userRole) {
      next();
      return;
    }

    return res.status(403).json({
      message: "¡Se requiere rol de Usuario!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * 🔄 Middleware: Admin o Moderator
 */
export const isModeratorOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    const hasRole = roles.some((role) =>
      ["admin", "moderator"].includes(role.name)
    );

    if (hasRole) {
      next();
      return;
    }

    return res.status(403).json({
      message: "¡Se requiere rol de Moderador o Administrador!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};