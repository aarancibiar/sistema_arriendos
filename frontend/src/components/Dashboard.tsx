import { useEffect, useState } from "react";
import { api } from "../services/api";

interface Arriendo {
  id: number;
  patente_vehiculo: string;
  tipo_vehiculo: string;
  rut_cliente: string;
  nombre_cliente: string;
  fecha_inicio: string;
  fecha_fin: string | null;
}

export default function Dashboard() {
  const [activos, setActivos] = useState<Arriendo[]>([]);
  const [finalizados, setFinalizados] = useState<Arriendo[]>([]);
  const [mensaje, setMensaje] = useState("");

  const cargarDatos = async () => {
    try {
      const r1 = await api.get("/arriendos/activos");
      const r2 = await api.get("/arriendos/finalizados");
      setActivos(r1.data);
      setFinalizados(r2.data);
    } catch (error) {
      console.error("Error al cargar arriendos:", error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const finalizar = async (id: number) => {
    try {
      await api.put(`/arriendos/finalizar/${id}`);
      setMensaje("Arriendo finalizado");
      cargarDatos();
    } catch {
      setMensaje("Error al finalizar");
    }
  };

  const eliminar = async (id: number) => {
    try {
      await api.delete(`/arriendos/${id}`);
      setMensaje("Arriendo eliminado");
      cargarDatos();
    } catch {
      setMensaje("Error al eliminar");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Panel de Arriendos</h2>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}

      <h4>🔵 Activos</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Patente</th><th>Tipo</th><th>Cliente</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {activos.map((a) => (
            <tr key={a.id}>
              <td>{a.patente_vehiculo}</td>
              <td>{a.tipo_vehiculo}</td>
              <td>{a.nombre_cliente}</td>
              <td>
                <button className="btn btn-success btn-sm me-2" onClick={() => finalizar(a.id)}>Finalizar</button>
                <button className="btn btn-danger btn-sm" onClick={() => eliminar(a.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="mt-4">✅ Finalizados</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Patente</th><th>Tipo</th><th>Cliente</th><th>Fecha Fin</th>
          </tr>
        </thead>
        <tbody>
          {finalizados.map((a) => (
            <tr key={a.id}>
              <td>{a.patente_vehiculo}</td>
              <td>{a.tipo_vehiculo}</td>
              <td>{a.nombre_cliente}</td>
              <td>{new Date(a.fecha_fin!).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}