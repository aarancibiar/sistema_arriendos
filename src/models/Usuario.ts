import { DataTypes, Model } from "sequelize";
import db from "../db"; // ajustá esto a tu ruta de conexión

export class Usuario extends Model {
  declare email: string;
  declare password: string;
}

Usuario.init(
  {
    email: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "Usuario",
    tableName: "usuarios",
    timestamps: false,
  }
);