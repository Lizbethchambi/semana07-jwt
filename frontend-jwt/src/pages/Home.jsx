function Home({ user }) {
  return (
    <div className="container">
      <div className="card">
        <h1>Inicio</h1>

        {user ? (
          <>
            <h2>Bienvenido, {user.username}</h2>
            <p>Rol: {user.roles?.map(r => r.replace("ROLE_", "")).join(", ")}</p>
          </>
        ) : (
          <p>Bienvenido. Inicia sesión para continuar.</p>
        )}
      </div>
    </div>
  );
}

export default Home;