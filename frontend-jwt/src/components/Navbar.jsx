import { Link } from "react-router-dom";

function Navbar({ user, logout }) {
  return (
    <nav>
      <Link to="/">Inicio</Link> |{" "}

      {!user ? (
        <Link to="/login">Login</Link>
      ) : (
        <>
          <Link to="/user">Usuario</Link> |{" "}
          <button onClick={logout}>Cerrar sesión</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;