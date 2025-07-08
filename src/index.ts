import express from "express";
import server from "./server";
import sequelize from "./db";
import cors from "cors";
import Arriendo from "./models/Arriendo";
import { Usuario }  from "./models/Usuario";

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());


sequelize.authenticate()
  .then(() => {
    console.log("Conexión a MySQL exitosa");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("Modelos sincronizados con la base de datos");
    server.listen(3000, () => {
      console.log("Servidor escuchando en puerto 3000");
    });
  })