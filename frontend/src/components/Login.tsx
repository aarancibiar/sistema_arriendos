import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      await api.post("/usuarios/login", { email, password });
      navigate("/dashboard");
    } catch {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-start min-vh-100 pt-5 bg-light">
      <div style={{ maxWidth: "720px", width: "100%" }} className="px-4">
        <div className="bg-white p-4 rounded shadow-sm">
          <h2 className="mb-3">Iniciar Sesión</h2>
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
          <button className="btn btn-primary w-100 mt-3" onClick={handleLogin}>
            Ingresar
          </button>
        </div>
      </div>
    </div>
  );
}