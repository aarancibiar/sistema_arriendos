import { Sequelize } from "sequelize";

const sequelize = new Sequelize("arriendos_db", "root", "", {
  host: "localhost",
  dialect: "mysql"
});

export default sequelize;