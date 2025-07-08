import Express, { Router } from "express";
import cors from "cors";
import router from './router'

const server = Express()

server.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

//las rutas entran directamente sin prefijo
server.use(Express.json())
server.use(router)

export default server