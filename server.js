// Importa Express para crear la aplicación web
import express from "express";

// Importa CORS para permitir solicitudes desde otros dominios
import cors from "cors";

// Importa los modelos y configuración de Sequelize
import db from "./app/models/index.js";

// Importa las rutas de autenticación (signup, signin)
import authRoutes from "./app/routes/auth.routes.js";

// Importa las rutas protegidas por roles de usuario
import userRoutes from "./app/routes/user.routes.js";

// Crea una instancia de Express
const app = express();

// Configura las opciones de CORS
const corsOptions = {
  origin: "http://localhost:5173",
};

// Aplica CORS
app.use(cors(corsOptions));

// Middleware para JSON
app.use(express.json());

// Middleware para datos tipo formulario
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Node.js JWT Authentication API." });
});

// Rutas de autenticación
app.use("/api/auth", authRoutes);

// Rutas de prueba por roles
app.use("/api/test", userRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 3000;

// Sincroniza la base de datos y levanta el servidor
db.sequelize.sync({ force: false }).then(() => {
  console.log("Database synchronized");

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});