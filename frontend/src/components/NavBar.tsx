import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">ArriendosApp</Link>

      
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContenido"
        aria-controls="navbarContenido"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Contenido colapsable */}
      <div className="collapse navbar-collapse" id="navbarContenido">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/registro">Registro</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Panel</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/crear">Crear Arriendo</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cambiar-clave">Cambiar Clave</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}