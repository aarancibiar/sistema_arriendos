import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateArriendo() {
  const [patente, setPatente] = useState("");
  const [tipo, setTipo] = useState("Sedan");
  const [rut, setRut] = useState("");
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const crearArriendo = async () => {
    if (!patente || !tipo || !rut || !nombre) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const res = await api.post("/arriendos/crear", {
        patente_vehiculo: patente,
        tipo_vehiculo: tipo,
        rut_cliente: rut,
        nombre_cliente: nombre,
      });
      setMensaje(res.data.mensaje || "Arriendo creado con éxito");
      setError("");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch {
      setError("Error al registrar el arriendo");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-start min-vh-100 pt-5 bg-light">
      <div style={{ maxWidth: "720px", width: "100%" }} className="px-4">
        <div className="bg-white p-4 rounded shadow-sm">
          <h2 className="mb-3">Ingresar Arriendo</h2>
          {mensaje && <div className="alert alert-success">{mensaje}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <input
            className="form-control mt-2"
            placeholder="Patente (Ej: ABCD12)"
            onChange={(e) => setPatente(e.target.value)}
          />
          <select
            className="form-control mt-2"
            onChange={(e) => setTipo(e.target.value)}
            value={tipo}
          >
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Camioneta">Camioneta</option>
          </select>
          <input
            className="form-control mt-2"
            placeholder="RUT cliente"
            onChange={(e) => setRut(e.target.value)}
          />
          <input
            className="form-control mt-2"
            placeholder="Nombre cliente"
            onChange={(e) => setNombre(e.target.value)}
          />
          <button
            className="btn btn-primary w-100 mt-3"
            onClick={crearArriendo}
          >
            Registrar Arriendo
          </button>
        </div>
      </div>
    </div>
  );
}