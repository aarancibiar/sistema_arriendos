import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password || !password2) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== password2) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await api.post("/usuarios/crear", { email, password });
      setMensaje(res.data.mensaje);
      setError("");
      setTimeout(() => navigate("/"), 3000);
    } catch {
      setError("Ese usuario ya existe");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-start min-vh-100 pt-5 bg-light">
      <div style={{ maxWidth: "720px", width: "100%" }} className="px-4">
        <div className="bg-white p-4 rounded shadow-sm">
          <h2 className="mb-3">Registro de Usuario</h2>
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
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="form-control mt-2"
            type="password"
            placeholder="Repetir contraseña"
            onChange={(e) => setPassword2(e.target.value)}
          />
          <button
            className="btn btn-primary w-100 mt-3"
            onClick={handleRegister}
          >
            Registrarme
          </button>
        </div>
      </div>
    </div>
  );
}