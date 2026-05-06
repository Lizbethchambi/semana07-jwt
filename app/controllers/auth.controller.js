// Importa el objeto de modelos (User, Role, etc.) desde la carpeta models
import db from "../models/index.js";

// Importa la librería jsonwebtoken para generar tokens JWT
import jwt from "jsonwebtoken";

// Importa bcryptjs para encriptar y comparar contraseñas
import bcrypt from "bcryptjs";

// Importa la configuración del secreto JWT
import authConfig from "../config/auth.config.js";

// Extrae los modelos User y Role del objeto db
const { user: User, role: Role } = db;

/**
 * 🟢 REGISTRO DE USUARIO
 */
export const signup = async (req, res) => {
  try {
    // Extrae datos del body
    const { username, email, password } = req.body;

    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(password, 8);

    // Busca el rol "user" por defecto
    const userRole = await Role.findOne({
      where: { name: "user" },
    });

    // Crea el usuario
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Asocia el rol al usuario
    await user.setRoles([userRole]);

    // Respuesta exitosa
    res.status(201).json({
      message: "User registered successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * 🔐 LOGIN DE USUARIO
 */
export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscar usuario con sus roles
    const user = await User.findOne({
      where: { username },
      include: {
        model: Role,
        as: "roles",
      },
    });

    // Si no existe
    if (!user) {
      return res.status(404).json({
        message: "User Not found.",
      });
    }

    // Comparar contraseña
    const passwordIsValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    // Generar token
    const token = jwt.sign(
      { id: user.id },
      authConfig.secret,
      { expiresIn: 86400 } // 24 horas
    );

    // Convertir roles a formato ROLE_...
    const authorities = user.roles.map(
      (role) => "ROLE_" + role.name.toUpperCase()
    );

    // Respuesta final
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};