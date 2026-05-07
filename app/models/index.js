// app/models/index.js

// Importamos Sequelize, que es el ORM que utilizaremos para interactuar con la base de datos
import Sequelize from "sequelize";

// Importamos la configuración de la base de datos desde un archivo externo
import dbConfig from "../config/db.config.js";

// Importamos los modelos de usuario y rol
import userModel from "./user.model.js";
import roleModel from "./role.model.js";

const sequelize = new Sequelize(process.env.MYSQL_PUBLIC_URL, {
  dialect: "mysql",
  dialectOptions: {
    connectTimeout: 60000,
  },
});

// Creamos un objeto para almacenar los modelos y la instancia de Sequelize
const db = {};

// Asignamos Sequelize y la instancia sequelize al objeto db
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Inicializamos los modelos de usuario y rol, pasándoles la instancia de Sequelize y el objeto Sequelize
db.user = userModel(sequelize, Sequelize);
db.role = roleModel(sequelize, Sequelize);

// Definimos una relación de muchos a muchos entre roles y usuarios
db.role.belongsToMany(db.user, {
  through: "user_roles",   // Nombre de la tabla intermedia que almacena las relaciones
  foreignKey: "roleId",    // Clave foránea en la tabla intermedia que referencia a roles
  otherKey: "userId",      // Clave foránea en la tabla intermedia que referencia a usuarios
});

// Definimos la relación inversa de muchos a muchos entre usuarios y roles
db.user.belongsToMany(db.role, {
  through: "user_roles",   // Nombre de la tabla intermedia
  foreignKey: "userId",    // Clave foránea que referencia a usuarios
  otherKey: "roleId",      // Clave foránea que referencia a roles
  as: "roles",             // Alias para acceder a los roles de un usuario
});

// Definimos una constante con los posibles roles que se pueden asignar
db.ROLES = ["user", "admin", "moderator"];

// Exportamos el objeto db para que pueda ser utilizado en otras partes de la aplicación
export default db;