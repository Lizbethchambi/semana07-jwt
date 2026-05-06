import { useEffect, useState } from "react";
import axios from "axios";

function User({ user }) {
  const [userMsg, setUserMsg] = useState("");
  const [modMsg, setModMsg] = useState("");
  const [adminMsg, setAdminMsg] = useState("");

  useEffect(() => {
    const getData = async () => {
      const headers = {
        Authorization: `Bearer ${user.accessToken}`,
      };

      try {
        const response = await axios.get(
          "http://localhost:3000/api/test/user",
          { headers }
        );
        setUserMsg(response.data);
      } catch {
        setUserMsg("No autorizado.");
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/api/test/mod",
          { headers }
        );
        setModMsg(response.data);
      } catch {
        setModMsg("No tiene acceso de moderador.");
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/api/test/admin",
          { headers }
        );
        setAdminMsg(response.data);
      } catch {
        setAdminMsg("No tiene acceso de administrador.");
      }
    };

    if (user) {
      getData();
    }
  }, [user]);

  return (
  <div className="container">
    <div className="card">
      <h2>Zona Usuario</h2>

      <p><strong>Usuario:</strong> {user.username}</p>

      {user.roles.includes("ROLE_USER") && (
        <p><strong>Contenido:</strong> {userMsg}</p>
      )}

      {user.roles.includes("ROLE_MODERATOR") && (
        <p><strong>Contenido:</strong> {modMsg}</p>
      )}

      {user.roles.includes("ROLE_ADMIN") && (
        <p><strong>Contenido:</strong> {adminMsg}</p>
      )}

    </div>
  </div>
);
}

export default User;