import { Request, Response } from "express";
import { Usuario } from "../models/Usuario";
import bcrypt from "bcrypt";

export const crearUsuario = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password || password.length < 6) {
    return res.status(400).json({ error: "Email y contraseña requeridos (mínimo 6 caracteres)" });
  }

  try {
    const existe = await Usuario.findByPk(email);
    if (existe) {
      return res.status(409).json({ error: "El usuario ya existe" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await Usuario.create({ email, password: passwordHash });

    res.status(201).json({ mensaje: "Usuario creado con éxito" });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "No se pudo registrar el usuario" });
  }
};

export const loginUsuario = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Debe ingresar email y contraseña" });
  }

  try {
    const usuario = await Usuario.findByPk(email);

    if (!usuario) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const coincide = await bcrypt.compare(password, usuario.password);

    if (!coincide) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    res.json({ mensaje: "Login exitoso" });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error en el servidor durante el login" });
  }
};

export const cambiarPassword = async (req: Request, res: Response) => {
  const { email, password_actual, password_nueva, password_nueva_repetida } = req.body;

  if (!email || !password_actual || !password_nueva || !password_nueva_repetida) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  if (password_nueva.length < 6) {
    return res.status(400).json({ error: "La nueva contraseña debe tener al menos 6 caracteres" });
  }

  if (password_nueva !== password_nueva_repetida) {
    return res.status(400).json({ error: "La nueva contraseña no coincide en ambos campos" });
  }

  try {
    const usuario = await Usuario.findByPk(email);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const coincide = await bcrypt.compare(password_actual, usuario.password);

    if (!coincide) {
      return res.status(401).json({ error: "La contraseña actual no es correcta" });
    }

    const nuevoHash = await bcrypt.hash(password_nueva, 10);
    usuario.password = nuevoHash;
    await usuario.save();

    res.json({ mensaje: "Contraseña actualizada con éxito" });
  } catch (error) {
    console.error("Error al cambiar contraseña:", error);
    res.status(500).json({ error: "Error del servidor al cambiar la contraseña" });
  }
};