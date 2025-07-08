import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CambiarPassword() {
  const [email, setEmail] = useState("");
  const [actual, setActual] = useState("");
  const [nueva, setNueva] = useState("");
  const [repetida, setRepetida] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    if (!email || !actual || !nueva || !repetida) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (nueva.length < 6) {
      setError("La nueva contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (nueva !== repetida) {
      setError("Las contraseñas nuevas no coinciden");
      return;
    }

    try {
      const res = await api.put("/usuarios/cambiar", {
        email,
        password_actual: actual,
        password_nueva: nueva,
        password_nueva_repetida: repetida,
      });
      setMensaje(res.data.mensaje);
      setError("");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch {
      setError("Credenciales incorrectas o error en el cambio");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-start min-vh-100 pt-5 bg-light">
      <div style={{ maxWidth: "720px", width: "100%" }} className="px-4">
        <div className="bg-white p-4 rounded shadow-sm">
          <h2 className="mb-3">Cambiar Contraseña</h2>
          {mensaje && <div className="alert alert-success">{mensaje}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <input
            className="form-control mt-2"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="form-control mt-2"
            type="password"
            placeholder="Contraseña actual"
            onChange={(e) => setActual(e.target.value)}
          />
          <input
            className="form-control mt-2"
            type="password"
            placeholder="Nueva contraseña"
            onChange={(e) => setNueva(e.target.value)}
          />
          <input
            className="form-control mt-2"
            type="password"
            placeholder="Repetir nueva contraseña"
            onChange={(e) => setRepetida(e.target.value)}
          />

          <button
            className="btn btn-warning w-100 mt-3"
            onClick={handleChangePassword}
          >
            Actualizar contraseña
          </button>
        </div>
      </div>
    </div>
  );
}