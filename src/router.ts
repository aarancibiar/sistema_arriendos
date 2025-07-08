import { Router } from "express";
import { getArriendoById, getArriendosActivos, crearArriendo, finalizarArriendo, getArriendosFinalizados, eliminarArriendo, getArriendosPorTipo } from "./handlers/arriendos";
import { crearUsuario, loginUsuario, cambiarPassword } from "./handlers/usuarios";

const router = Router();

//Arriendos
router.get("/arriendos/activos", getArriendosActivos);
router.get("/arriendos/finalizados", getArriendosFinalizados);
router.get("/arriendos/stats", getArriendosPorTipo);
router.get('/arriendos/:id', getArriendoById)
router.post("/arriendos/crear", crearArriendo);
router.put("/arriendos/finalizar/:id", finalizarArriendo);
router.delete("/arriendos/:id", eliminarArriendo);

//Usuarios
router.post("/usuarios/crear", crearUsuario);
router.post("/usuarios/login", loginUsuario);
router.put("/usuarios/cambiar", cambiarPassword);



export default router;
