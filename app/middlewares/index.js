// Importamos todo lo exportado desde 'authJwt.js' como un objeto llamado 'authJwt'
import * as authJwt from "./authJwt.js";

// Importamos funciones específicas desde 'verifySignUp.js'
import {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
} from "./verifySignUp.js";

// Exportamos todo junto para fácil uso en otras partes
export { authJwt, checkDuplicateUsernameOrEmail, checkRolesExisted };