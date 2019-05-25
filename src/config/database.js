import Sequelize from "sequelize";
import {
  MYSQL_HOST,
  MYSQL_DATABASE,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  ENV
} from "./secrets";
const sequelize = new Sequelize(
  MYSQL_DATABASE,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  {
    host: MYSQL_HOST,
    dialect: "mysql",
    logging: ENV === "production" ? false : console.log,
    operatorsAliases: false
  }
);

export default sequelize;
