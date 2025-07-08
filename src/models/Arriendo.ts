import { DataTypes } from "sequelize";
import sequelize from "../db";

const Arriendo = sequelize.define("Arriendo", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: true
  },
  patente_vehiculo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo_vehiculo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rut_cliente: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nombre_cliente: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Arriendo;