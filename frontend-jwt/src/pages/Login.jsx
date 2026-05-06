import { useState } from "react";
import { login } from "../services/auth.service";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }

    if (password.length < 6) {
      setMensaje("La contraseña debe tener mínimo 6 caracteres.");
      return;
    }

    try {
      const data = await login(username, password);
      console.log("RESPUESTA BACKEND:", data);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);

      setMensaje("Inicio de sesión correcto.");
    } catch (error) {
      console.log("ERROR:", error);
      setMensaje("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Iniciar sesión</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Iniciar sesión</button>
        </form>

        <p className="mensaje">{mensaje}</p>
      </div>
    </div>
  );
}

export default Login;