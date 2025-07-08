import { Request, Response } from "express";
import Arriendo from "../models/Arriendo";
import { Op } from "sequelize";

//lista todos los arriendos activos fecha_fin = null
export const getArriendosActivos = async (req: Request, res: Response) => {
  try {
    const activos = await Arriendo.findAll({ where: { fecha_fin: null } });
    res.json(activos);
  } catch (error) {
    res.status(500).json({ error: "Error al listar arriendos activos" });
  }
};

//muestra info de un arriendo según su ID
export const getArriendoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const arriendo = await Arriendo.findByPk(id);
    if (arriendo) {
      res.json(arriendo);
    } else {
      res.status(404).json({ error: "Arriendo no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al buscar arriendo" });
  }
};

export const crearArriendo = async (req: Request, res: Response) => {
  try {
    const { patente_vehiculo, tipo_vehiculo, rut_cliente, nombre_cliente } = req.body;

    if (!patente_vehiculo || !tipo_vehiculo || !rut_cliente || !nombre_cliente) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const nuevoArriendo = await Arriendo.create({
      fecha_inicio: new Date(),
      fecha_fin: null,
      patente_vehiculo,
      tipo_vehiculo,
      rut_cliente,
      nombre_cliente
    });

    res.status(201).json(nuevoArriendo);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el arriendo" });
  }
};

export const finalizarArriendo = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const arriendo = await Arriendo.findByPk(id) as any;

    if (!arriendo) {
      return res.status(404).json({ error: "Arriendo no encontrado" });
    }

    if (arriendo.fecha_fin !== null) {
      return res.status(400).json({ error: "El arriendo ya fue finalizado" });
    }

    arriendo.fecha_fin = new Date();
    await arriendo.save();

    res.json({ mensaje: "Arriendo finalizado con éxito", arriendo });
  } catch (error) {
    console.error("Error al finalizar arriendo:", error);
    res.status(500).json({ error: "Error al finalizar arriendo" });
  }
};

export const getArriendosFinalizados = async (req: Request, res: Response) => {
  try {
    const finalizados = await Arriendo.findAll({
      where: { fecha_fin: { [Op.ne]: null } },
      order: [["fecha_fin", "DESC"]],
    });

    res.json(finalizados);
  } catch (error) {
    console.error("Error al obtener arriendos finalizados:", error);
    res.status(500).json({ error: "No se pudieron cargar los arriendos finalizados" });
  }
};

export const eliminarArriendo = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const arriendo = await Arriendo.findByPk(id);

    if (!arriendo) {
      return res.status(404).json({ error: "Arriendo no encontrado" });
    }

    await arriendo.destroy();

    res.json({ mensaje: "Arriendo eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar arriendo:", error);
    res.status(500).json({ error: "Error al eliminar arriendo" });
  }
};

export const getArriendosPorTipo = async (req: Request, res: Response) => {
  try {
    const tipos = ["Sedan", "SUV", "Camioneta"];
    const conteos: Record<string, number> = {};

    for (const tipo of tipos) {
      const cantidad = await Arriendo.count({ where: { tipo_vehiculo: tipo } });
      conteos[tipo] = cantidad;
    }

    res.json(conteos);
  } catch (error) {
    console.error("Error al contar arriendos por tipo:", error);
    res.status(500).json({ error: "Error al obtener las estadísticas de vehículos" });
  }
};